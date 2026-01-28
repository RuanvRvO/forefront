import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/server"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  console.log("[Proxy] Request URL:", request.url);
  console.log("[Proxy] Request method:", request.method);
  
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    console.log("[Proxy] Authenticated user on signin page, redirecting to /");
    return nextjsMiddlewareRedirect(request, "/");
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    console.log("[Proxy] Unauthenticated user on protected route, redirecting to /signin");
    return nextjsMiddlewareRedirect(request, "/signin");
  }
  
  console.log("[Proxy] Passing through request");
}, { verbose: true });

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
