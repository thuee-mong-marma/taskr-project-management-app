import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes: ['/'],
  //checks if user is authenticated, if so redirect the user to default org page or manage org page
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = '/create-org';

      //* this doesn't seem to work currently, will check out later
      //* this should redirect user to a org page if they have at least one org under their account
      // if (auth.orgId) {
      //   path = `/org/${auth.orgId}`;
      // }

      const orgSelection = new URL(path, req.url);

      return NextResponse.redirect(orgSelection);
    }

    //if not logged in and trying to access a private route send back to sign in then returns to the url the user requested
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    //if user is authenticated but have not org send them to create org page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/create-org') {
      const orgSelection = new URL('/create-org', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
