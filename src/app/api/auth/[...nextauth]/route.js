import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import userModels from "@/models/userModels";
import connectDB from "@/lib/dbConnect";

// Connect to MongoDB once
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
    // SignIn callback to check email verification and create new user if not found
    async signIn({ user, account, profile }) {
      if (account.provider === "google" && !profile.email_verified) {
        return false; // Block sign-in if email is not verified
      }

      try {
        let existingUser = await userModels.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user if not found in the database
          existingUser = await userModels.create({
            fullName: user.name,
            email: user.email,
            profilePic: profile.picture || "",
          });
        }

        user._id = existingUser._id; // Add _id to the user object
        return true;
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false; // If any error occurs, sign-in will be blocked
      }
    },

    // JWT callback to add custom properties to the JWT token
    async jwt({ token, user }) {
      if (user) {
        // Add user details to token during sign-in
        token.id = user._id;
        token.email = user.email;
        token.profilePic = user.profilePic || null;
      }

      return token; // Return token to the session callback
    },

    // Session callback to attach custom token properties to the session object
    async session({ session, token }) {
      console.log("Session Callback", { session, token });

      if (token) {
        // Add user details to session from the token
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.profilePic = token.profilePic;
      }

      return session; // Return the modified session object
    },
  },

  pages: {
    error: "/auth/error",  // Custom error page
    signIn: "/auth/signin",  // Custom sign-in page
  },

  debug: process.env.NODE_ENV === "development", // Enable debug in development mode
};

export const GET = NextAuth(authOptions); // Handle GET requests
export const POST = NextAuth(authOptions); // Handle POST requests
