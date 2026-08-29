import { getCookie } from "@/services/auth/tokenHandlers";
import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "./lib/server-fetch";
import { jwtHelpers } from "./helpers/jwtHelpers";


function isTokenExpired(token: string) {
 try{
  jwtHelpers.verifyToken(token, process.env.JWT_SECRET as string);
  return false;
 } catch {
  return true;
 }
}

export async function proxy(request: NextRequest) {
    const accessToken = await getCookie('accessToken') || null;
    const refreshToken = await getCookie('refreshToken')|| null;
    const { pathname } = request.nextUrl;
    const authHeader = request.headers.get('authorization');
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');
    // const method = request.method;

    if((!authHeader && isApiRoute) || pathname === '/') {
      return NextResponse.next();
    }

    if((pathname === '/register' || pathname ==='/login') && !accessToken) {
      console.log('condition is true');
      return NextResponse.next();
    }

    if(pathname === '/register' || pathname === '/login' && accessToken) {
     return NextResponse.redirect(new URL('/', request.url));
    }

    if(!accessToken && !refreshToken && pathname!=='/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if(accessToken && !isTokenExpired(accessToken)) {
      return NextResponse.next();
    }

    if(refreshToken) {
      try{
        const refreshResponse = await serverFetch.get('/api/auth/login');
        
        if(refreshResponse.ok) {
          const data = await refreshResponse.json();
          const response = NextResponse.next();

          response.cookies.set("accessToken", data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            path: '/',
          });

          return response;
        }
      } catch {
        // throw Error("Error: "+err);
      }

      const response = NextResponse.redirect(
        new URL('/login', request.url)
      );


      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");

      if(pathname!=='/login')
        return response;
    }



    if(!accessToken && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }



    else if(accessToken && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/login',
     '/((?!_next/static|_next/image|favicon.ico).*)',
  ], 
};