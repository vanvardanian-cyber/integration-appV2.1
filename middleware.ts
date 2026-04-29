import { NextResponse } from "next/server";
import { isPreviewMode } from "@/lib/runtime";

/**
 * Route protection.
 *
 * Anything under /home, /path, /me, /onboarding requires a session. We don't
 * gate /signin or /signin/check-email here — those are the way back in if
 * you're logged out — and we don't gate the api/auth handlers because
 * NextAuth needs them open. The marketing landing (/) is also public.
 */
export default function middleware(req: Request & { nextUrl: URL }) {
  if (isPreviewMode) {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;
  const isProtected =
    path.startsWith("/home") ||
    path.startsWith("/path") ||
    path.startsWith("/me") ||
    path.startsWith("/onboarding");

  if (isProtected) {
    const signInUrl = new URL("/signin", req.nextUrl);
    signInUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and static files. Match everything else and let the
  // handler above decide what's public.
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json).*)"],
};
