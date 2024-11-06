import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import userModels from "@/models/userModels";
import connectDB from "@/lib/dbConnect";
import jwt from 'jsonwebtoken';
import { setCookie } from 'nookies';  // Use a cookie management library

// Connect to MongoDB
connectDB();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn Callback", { user, account, profile });

      if (account.provider === "google" && !profile.email_verified) {
        return "/auth/error?message=Email not verified. Please verify your email to continue.";
      }

      // Check if user exists in MongoDB database
      let existingUser = await userModels.findOne({ email: user.email });
      console.log("Existing User:", existingUser);

      if (!existingUser) {
        // If user doesn't exist, create a new user
        existingUser = await userModels.create({
          fullName: user.name,
          email: user.email,
          profilePic: profile.picture || "",
        });
        console.log("Created New User:", existingUser);
      }

      // Set the user ID for the session and token
      user._id = existingUser._id;
      console.log("User Object after setting _id:", user);

      // Generate a token after user is authenticated
      const token = generateToken({ id: existingUser._id, email: existingUser.email });

      // Return true to indicate successful sign-in
      return true;
    },

    async session({ session, token }) {
      console.log("Session Callback", { session, token });

      // Set session user data from token
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.profilePic = token.profilePic;
      session.token = token;  // Attach token to session
      return session;
    },

    async jwt({ token, user }) {
      console.log("JWT Callback", { token, user });

      if (user) {
        // Save _id and other details to the token for session management
        token.id = user._id;
        token.email = user.email;
        token.profilePic = user.profilePic || null;
        
        // Generate JWT token and save it in cookies
        const jwtToken = generateToken(token);

        // Save the JWT in cookies
        setCookie(null, 'userAuthToken', jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });

        // Return the token
        token.jwt = jwtToken;
      }
      return token;
    },
  },

  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
  },

  debug: process.env.NODE_ENV === "development",
};

// Function to generate a JWT token
function generateToken(user) {
  console.log('Generating token for user:', user);
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1w' });
}

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
