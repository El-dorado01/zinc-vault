// src/auth.ts
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { sendVerificationRequest } from "@/lib/authSendRequest";

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: "/api/v1/auth",
  providers: [
    Resend({
      from: process.env.EMAIL_FROM!,
      apiKey: process.env.RESEND_API_KEY!,
      async generateVerificationToken() {
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Generated verification token", { token });
        return token;
      },
      sendVerificationRequest: async (params) => {
        console.log("Calling sendVerificationRequest", { identifier: params.identifier });
        try {
          await sendVerificationRequest(params);
        } catch (error) {
          console.error("sendVerificationRequest failed", { error });
          throw error;
        }
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key
  }),
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account, profile, email }) {
      console.log("signIn callback", { user, account, profile, email });
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug logs
});