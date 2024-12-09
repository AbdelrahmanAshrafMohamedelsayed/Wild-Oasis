/*import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url)); // Redirect to /about if the user visits /account
}*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth; // Use the auth middleware (from next auth) to protect the /account route 

export const config = {
  matcher: ["/account"], // Only run this middleware for the /account route
};
