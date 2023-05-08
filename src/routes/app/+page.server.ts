import { URL } from '$lib/utilities/config';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, fetch }) => {
	const sessionId = cookies.get('sessionId');
	const username = cookies.get('username');
	const subdomain = cookies.get('subdomain');
	if (!sessionId || !username || !subdomain) throw redirect(308, '/');

	try {
		const res = await fetch(`${URL}/my_status`, {
			headers: {
				Authorization: `Bearer ${sessionId}`,
				Cookie:
					cookies.serialize('username', username) + ';' + cookies.serialize('subdomain', subdomain)
			}
		});
		if (!res.ok) throw undefined;

		const json = await res.json();

		return {
			exists: json.exists,
			session: {
				sessionId,
				username,
				subdomain
			}
		};
	} catch (e) {
		cookies.delete('sessionId');
		cookies.delete('password');
		throw redirect(307, '/');
	}
}) satisfies PageServerLoad;
