import { getCookie } from "@/services/auth/tokenHandlers";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const accessToken = await getCookie('accessToken') || null;
    const { pathname } = request.nextUrl;

    if(!accessToken && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
     '/((?!_next/static|_next/image|favicon.ico).*)',
  ], 
};