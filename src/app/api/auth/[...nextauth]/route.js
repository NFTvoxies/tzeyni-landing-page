import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { mockLogin } from "@/lib/mockApi";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        try {
          // Use mock API for authentication
          const result = await mockLogin(
            credentials.email,
            credentials.password,
            credentials.role || 'client'
          );

          console.log('Login result:', result); // Debug log

          if (result && result.status) {
            const user = {
              id: result.id || result.user?.id || "default-id",
              token: result.token,
              email: credentials.email,
              name: result.user?.full_name || credentials.email,
              role: result.role || result.user?.role,
              avatar: result.user?.avatar,
            };
            console.log('Returning user:', user); // Debug log
            return user;
          } else {
            throw new Error(result.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // On initial sign in, user object is available
      if (user) {
        console.log('JWT callback - user:', user); // Debug log
        token.id = user.id;
        token.accessToken = user.token;
        token.role = user.role;
        token.name = user.name;
        token.avatar = user.avatar;
        token.email = user.email;
      }
      console.log('JWT callback - token role:', token.role); // Debug log
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token); // Debug log
      if (token) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.avatar = token.avatar;
        session.user.email = token.email;
      }
      console.log('Session callback - session.user.role:', session.user.role); // Debug log
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/choose-login",
  },
  secret: process.env.NEXTAUTH_SECRET || "tzeyni-mock-secret-key-for-development",
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };