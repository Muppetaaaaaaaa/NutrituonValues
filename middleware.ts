import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is trying to access the site
  const isPasswordProtected = !request.cookies.get('site-access')?.value
  const isLoginPage = request.nextUrl.pathname === '/login'
  
  // If not authenticated and not on login page, redirect to login
  if (isPasswordProtected && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // If authenticated and on login page, redirect to home
  if (!isPasswordProtected && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
