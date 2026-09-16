import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


const protectedRoutes = [
  "/home",
  "/instagram",
  "/email"
]

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }

    return (
      pathname === route ||
      pathname.startsWith(`${route}/`)
    );
  });

  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for the custom proxy path


  ],
}