// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only process paths that start with /notes
  if (pathname.startsWith('/notes')) {
    // Skip middleware for static assets to ensure they load correctly
    const isStaticAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(pathname);
    if (isStaticAsset) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    
    // Extract the path after /notes
    let relativePath = pathname.replace(/^\/notes\/?/, '');
    
    // Determine if the URL ends with a trailing slash
    const hasTrailingSlash = pathname.endsWith('/');
    
    // Determine the target path in the public directory
    let targetPath;
    
    // Common file extensions that should be treated as files, not directories
    const fileExtensions = ['.html', '.htm', '.json', '.xml', '.txt', '.md'];
    const hasKnownExtension = fileExtensions.some(ext => relativePath.endsWith(ext));

    console.log(relativePath)
    
    if (relativePath === '' || relativePath === '/') {
      // Root of /notes -> serve /public/notes/index.html
      targetPath = '/notes/index.html';
    } else if (hasTrailingSlash) {
      // Directory path with trailing slash -> serve index.html in that directory
      targetPath = `/notes/${relativePath}index.html`;
    } else if (hasKnownExtension) {
      // Already has a known extension, pass through
      targetPath = `/notes/${relativePath}`;
    } else {
      // Check if this is likely a leaf node or a directory without trailing slash
      // This is a heuristic - we assume it's a leaf node and look for slug.html
      targetPath = `/notes/${relativePath}.html`;
    }
    
    // Set the new pathname and rewrite the request
    url.pathname = targetPath;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

// Make sure to include static asset extensions in the matcher negative lookahead
export const config = {
  matcher: [
    {
      source: '/notes/:path*',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};