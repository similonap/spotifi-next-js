import { cookies } from "next/headers";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from "jsonwebtoken";
 

export async function proxy(request: NextRequest) {
    try {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get("jwt");

    if (jwtCookie) {
        jwt.verify(jwtCookie.value, process.env.JWT_SECRET!);
    } else {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    } catch (e) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    } 
    return NextResponse.next();
}

export const config = {
  matcher: ['/','/songs', '/billing', '/songs/:id'],
}