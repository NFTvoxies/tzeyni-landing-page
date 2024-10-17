import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
          const apiEndpoint = credentials.role === "professional"
            ? `${process.env.BACKEND_URL}/api/professional/login`
            : `${process.env.BACKEND_URL}/api/user/login`;

          const response = await axios.post(apiEndpoint, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = response.data;

          if (user && user.status) {
            return {
              id: user.id || "default-id",
              token: user.token,
              email: credentials.email,
              role: user.role,
            };
          } else {
            throw new Error(user.message || 'Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.role = token.role;
      return session;
    },
  },  
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };