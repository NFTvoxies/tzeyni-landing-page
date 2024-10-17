import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/choose-login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;

      // Restrict access to certain paths based on user role
      if (pathname.startsWith("/dashboard") && token?.role !== "professional") {
        return false;
      }
      if (pathname.startsWith("/home") && token?.role !== "client") {
        return false;
      }

      // Allow access if role matches the required page or for public pages
      return true;
    },
  },
});

export const config = {
  matcher: ["/home", "/dashboard", "/profile", "/orders", "/reservations"],
};