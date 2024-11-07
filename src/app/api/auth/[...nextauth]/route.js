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
      scope: "openid profile email", // Ensure you're requesting email and profile information
      async profile(profile) {
        // You can transform the profile object here if needed
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture, // Google provides a 'picture' field
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile) {
        // Facebook profile data may vary, ensure the 'picture' property exists
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture?.data?.url || null, // Facebook's image URL may be nested
        };
      },
    }),
  ],

  callbacks: {
    // SignIn callback to check email verification and create new user if not found
    async signIn({ user, account, profile }) {
      if (account.provider === "google" && !profile.email_verified) {
        console.error("Google email is not verified.");
        return false; // Block sign-in if email is not verified
      }

      try {
        let existingUser = await userModels.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user if not found in the database
          existingUser = await userModels.create({
            fullName: user.name,
            email: user.email,
            profilePic: user.image || "", // Profile pic may come from Google/Facebook
          });
        }

        user._id = existingUser._id; // Attach MongoDB _id to the user object
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // If any error occurs, sign-in will be blocked
      }
    },

    // JWT callback to add custom properties to the JWT token
    async jwt({ token, user }) {
      if (user) {
        // Add user details to token during sign-in
        token.id = user._id;
        token.email = user.email;
        token.profilePic = user.profilePic || null; // If no profile picture, set null
      }

      return token; // Return token to the session callback
    },

    // Session callback to attach custom token properties to the session object
    async session({ session, token }) {
      if (token) {
        // Attach user details from the token to the session object
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.profilePic = token.profilePic;
      }

      return session; // Return the modified session object
    },
  },

  pages: {
    error: "/auth/error", // Custom error page
    signIn: "/auth/signin", // Custom sign-in page
  },

  debug: process.env.NODE_ENV === "development", // Enable debug in development mode
};

export const GET = NextAuth(authOptions); // Handle GET requests
export const POST = NextAuth(authOptions); // Handle POST requests
