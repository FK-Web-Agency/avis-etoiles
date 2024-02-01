import { authMiddleware } from '@clerk/nextjs';

// This middleware will run for every request
export default authMiddleware({
  publicRoutes: (req) => !req.url.includes('/dashboard'),
  ignoredRoutes: ['/api/send', '/api/webhook(.*)', '/game(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
