// src/auth.ts
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST!,
        port: Number(process.env.EMAIL_SERVER_PORT!),
        auth: {
          user: process.env.EMAIL_SERVER_USER!,
          pass: process.env.EMAIL_SERVER_PASSWORD!,
        },
      },
      from: process.env.EMAIL_FROM!,
      async generateVerificationToken() {
        // Generate a 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
      },
      async sendVerificationRequest({ identifier: email, token, provider }) {
        const msg = {
          to: email,
          from: provider.from,
          subject: "Your OTP for Login",
          text: `Your OTP is ${token}. It expires in 10 minutes.`,
          html: `<p>Your OTP is <strong>${token}</strong>. It expires in 10 minutes.</p>`,
        };

        // Use nodemailer to send email
        const nodemailer = require("nodemailer");
        const transport = nodemailer.createTransport({
          host: provider.server.host,
          port: provider.server.port,
          auth: {
            user: provider.server.auth.user,
            pass: provider.server.auth.pass,
          },
        });
        await transport.sendMail(msg);
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
  },
});
