// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   try {
//     const token = request.cookies.get("token")?.value;
//     const isAuth = Boolean(token);
//     const isLoginPage = request.nextUrl.pathname === "/";

//     if (isAuth && isLoginPage) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }

//     if (!isAuth && request.nextUrl.pathname.startsWith("/dashboard")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware failed:", error);
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/", "/dashboard"],
// };
