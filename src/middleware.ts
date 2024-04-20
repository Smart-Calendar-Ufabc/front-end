import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/home', '/profile']
const publicRoutes = ['/', '/signup', '/password-recovery']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const session = cookies().get('session')?.value

  // 3. Redirect to / if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/'))
  }

  // 4. Redirect to /home if the user is authenticated
  if (isPublicRoute && session && !req.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/home'))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/signup/:path*', '/password-recovery/:path*'],
}
