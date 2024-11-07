import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import userModels from "@/models/userModels";
import connectDB from "@/lib/dbConnect";

// Connect to MongoDB once
connectDB();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: "openid profile email", // Only email and profile are needed to access name and email
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],

  callbacks: {
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
          });
        }

        user._id = existingUser._id; // Attach MongoDB _id to the user object
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    error: "/auth/error", // Custom error page
    signIn: "/auth/signin", // Custom sign-in page
  },

  debug: process.env.NODE_ENV === "development", // Enable debug in development mode
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
