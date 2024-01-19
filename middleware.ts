import { authMiddleware } from '@clerk/nextjs';

// This middleware will run for every request
export default authMiddleware({
  publicRoutes: ["/api/webhooks(.*)"],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
