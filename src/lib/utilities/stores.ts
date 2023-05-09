import { writable, type Writable } from 'svelte/store';

const session: Writable<{ username: string; sessionId: string; subdomain: string } | undefined> =
	writable();

const loading = writable(false);

export { session, loading };
