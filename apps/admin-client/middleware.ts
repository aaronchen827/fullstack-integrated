import { NextRequest, NextResponse } from 'next/server'

const publicPaths = ['/admin/user/login', '/mui']

const validPages = [
  '/home',
  '/dashboard',
  '/menu-management',
  '/iframe',
  '/setting',
  '/user-management',
  '/role-management',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl
  console.log('pathname=', pathname)
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }
  // const token = request.cookies.get('token')
  // console.log('token=', token)
  // if (!token) {
  //   const loginUrl = new URL('/login', request.url)
  //   return NextResponse.redirect(loginUrl)
  // }
  if (!validPages.includes(pathname)) {
    url.pathname = '/not-found'
    return NextResponse.rewrite(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api|fonts|images|login).*)'],
}
