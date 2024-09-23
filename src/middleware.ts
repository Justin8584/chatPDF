import { authMiddleware } from "@clerk/nextjs/server";

// https://clerk.com/docs/references/nextjs/auth-middleware

export default authMiddleware({
    publicRoutes: ["/", "/api/webhook"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
