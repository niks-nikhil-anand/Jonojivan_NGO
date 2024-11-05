import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
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
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        // Check for Google account-specific errors here
        if (!profile.email_verified) {
          throw new Error("Email not verified. Please verify your email to continue.");
        }
      }
      // Additional logic can go here
      return true; // Allow sign in
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: '/auth/error', // Error page
  },
  debug: process.env.NODE_ENV === "development", // Enable debug messages in development
});
