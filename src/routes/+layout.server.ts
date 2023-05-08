import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, url }) => {
	const username = cookies.get('username');
	const subdomain = cookies.get('subdomain');
	const sessionId = cookies.get('sessionId');
	const cookiesValid = username && sessionId && subdomain ? true : false;
	if (url.pathname == '/') {
		if (cookiesValid) throw redirect(308, '/app');
	} else {
		if (!cookiesValid) throw redirect(308, '/');
	}
}) satisfies LayoutServerLoad;
