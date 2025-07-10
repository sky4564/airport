import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // admin 경로에 대한 접근 제한
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const isProduction = process.env.NODE_ENV === 'production'
    const adminDisabled = process.env.DISABLE_ADMIN === 'true'

    // production 환경이거나 DISABLE_ADMIN이 true일 때 접근 차단
    if (isProduction || adminDisabled) {
      // 404 응답을 반환하여 admin 경로의 존재를 숨김
      return new NextResponse(null, { status: 404 })
    }
  }

  return NextResponse.next()
}

// admin 경로에만 미들웨어 적용
export const config = {
  matcher: '/admin/:path*'
} 