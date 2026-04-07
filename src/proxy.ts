import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './auth';

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const publicRoutes = [
		'/login',
		'/register',
		'/api/auth',
		'/favicon.ico',
		'/_next',
	];

	const isPublicRoute = publicRoutes.some((route) =>
		pathname.startsWith(route),
	);

	if (isPublicRoute) {
		return NextResponse.next();
	}

	const session = await auth();

	if (!session) {
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('callbackUrl', request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher:
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|css|js)$).*)',
};
