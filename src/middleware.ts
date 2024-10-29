// import { NextRequest, NextResponse } from "next/server";
// // import { getToken } from "next-auth/jwt";

// export const config = {
//   matcher: [
//     /*
//      * Match all paths except for:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /_static (inside /public)
//      * 4. all root files inside /public (e.g. /favicon.ico)
//      */
//     "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
//   ],
// };

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;

//   // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
//   let hostname = req.headers
//     .get("host")!
//     .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

//   // special case for Vercel preview deployment URLs
//   if (
//     hostname.includes("---") &&
//     hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
//   ) {
//     hostname = `${hostname.split("---")[0]}.${
//       process.env.NEXT_PUBLIC_ROOT_DOMAIN
//     }`;
//   }

//   const searchParams = req.nextUrl.searchParams.toString();
//   // Get the pathname of the request (e.g. /, /about, /blog/first-post)
//   const path = `${url.pathname}${
//     searchParams.length > 0 ? `?${searchParams}` : ""
//   }`;

//   // rewrites for app pages
//   if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//     // const session = await getToken({ req });
//     // if (!session && path !== "/login") {
//     //   return NextResponse.redirect(new URL("/login", req.url));
//     // } else if (session && path == "/login") {
//     //   return NextResponse.redirect(new URL("/", req.url));
//     // }
//     // return NextResponse.rewrite(
//     //   new URL(`/app${path === "/" ? "" : path}`, req.url),
//     // );
//   }

//   // special case for `vercel.pub` domain
//   if (hostname === "vercel.pub") {
//     return NextResponse.redirect(
//       "https://vercel.com/blog/platforms-starter-kit"
//     );
//   }

//   // rewrite root application to `/home` folder
//   if (
//     hostname === "localhost:3000" ||
//     hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
//   ) {
//     return NextResponse.rewrite(
//       new URL(`/home${path === "/" ? "" : path}`, req.url)
//     );
//   }

//   console.log("----hostname--", hostname);
//   console.log("---path--", path);

//   const subdomain = hostname.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
//     ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
//     : null;

//   console.log("&&&&&&&& Here &&&&&&&&&&&&&", `/${subdomain}${path}`);

//   // rewrite everything else to `/[domain]/[slug] dynamic route
//   return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
// }

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. test1.multi-tenant-indol.vercel.app)
  const hostname = req.headers.get("host")!;

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Check if hostname is the root domain
  if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    // Rewrite root application to `/home` folder
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url)
    );
  }

  console.log("----hostname--", hostname);
  console.log("---path--", path);

  // Extract subdomain (e.g., "test1" from "test1.multi-tenant-indol.vercel.app")
  const subdomain = hostname.split(".")[0];

  // Ensure subdomain is valid and not the root domain
  if (
    subdomain &&
    subdomain !== "www" &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
  ) {
    console.log("&&&&&&&& Here &&&&&&&&&&&&&", `/${subdomain}${path}`);

    // Rewrite everything else to `/[domain]/[slug]` dynamic route
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
  }

  // If no valid subdomain, return a 404 or handle it accordingly
  return NextResponse.next(); // or any fallback logic you prefer
}
