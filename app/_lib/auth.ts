import NextAuth from "next-auth";
import {Session, NextAuthConfig } from "next-auth"; // Add this import

import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
// Define custom session and user types
declare module "next-auth" {
    interface Session {
      user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        guestId?: string | null;
      };
    }
  }
  
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET, // Add this line

  callbacks: {
    authorized({ auth, request }: { auth: { user?: { name?: string; email?: string; image?: string; guestId?: string; } }; request: Request }) { // Added 'request' to the type definition
      console.log(request);
        return !!auth?.user;
    },
    async signIn({ user, account, profile }: {
        user: { email?: string; name?: string };
        account: { provider: string; type: string; }; // Added type for account
        profile: { id: string; email?: string; name?: string; }; // Added type for profile
    }) { // Updated to include 'account' and 'profile'
        try {
          console.log(account, profile);
        const existingGuest = await getGuest(user.email as string);
// if you don't use await here, the function will return true before the promise is resolved
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        // if you don't use await here, the function will return true before the promise is resolved and there is no guarantee that the guest will be created


        return true; // Return true to allow sign in
      } catch {
        return false; // Return false to deny sign in
      }
    },
    async session({ session, user }: { session: Session; user: { email?: string | null; name?: string | null; image?: string | null; guestId?: string | null; } }) { // Explicitly typed 'session' and 'user'
      console.log(user);
      const guest = await getGuest(session.user.email as string);
      session.user.guestId = String(guest?.id);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth, // this contain the user session
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig as NextAuthConfig);
