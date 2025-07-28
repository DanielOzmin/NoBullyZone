import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ["/protected"]

export function middleware(request: NextRequest) {
    console.log("Middleware fut: ", request.nextUrl.pathname)
    const token = request.cookies.get("jwt")?.value

    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    )

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
