import { authMiddleware } from '@clerk/nextjs';

// This middleware will run for every request
export default authMiddleware({
  publicRoutes: ['/', '/about', '/contact', '/features', '/prices', '/studio(.*)', 'api/send', '/api/webhooks(.*)'],
  ignoredRoutes:['/api/send', '/api/webhooks(.*)'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
