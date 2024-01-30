import { authMiddleware } from '@clerk/nextjs';

// This middleware will run for every request
export default authMiddleware({
  publicRoutes: ['/', '/about', '/contact', '/features', '/prices', '/studio(.*)', 'api/send', '/api/webhook(.*)', '/game(.*)'],
  ignoredRoutes:['/api/send', '/api/webhook(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
