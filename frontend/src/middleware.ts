import { NextRequest, NextResponse } from 'next/server';


export default function middleware (request: NextRequest){
  const token = request.cookies.get('access_token')?.value
  if (!token) {
    if(request.nextUrl.pathname === '/'){
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname === '/'){
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

}

export const config = {
  matcher:['/', '/dashboard/:path*', '/settings/:path*']
}
