<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { URL } from '$lib/utilities/config';
	import { session, loading } from '$lib/utilities/stores';
	import Cookies from 'js-cookie';
	import type { PageData } from './$types';

	export let data: PageData;
	$session = data.session;

	async function toggleUser(state: boolean) {
		$loading = true;
		const endpoint = state ? 'add_lunch_cron' : 'remove_lunch_cron';
		const credentials = {
			username: Cookies.get('username'),
			password: Cookies.get('password'),
			subdomain: Cookies.get('subdomain')
		};
		await fetch(`${URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});
		await invalidateAll();
		$loading = false;
	}
</script>

<div class="flex flex-col items-center gap-y-16 card p-5 w-full max-w-md">
	<h3>Status</h3>
	<p>
		Ordering lunches: <span
			class="font-bold text-md ml-1 {data.exists ? 'text-success-700' : 'text-error-500'}"
			>{data.exists ? 'ON' : 'OFF'}</span
		>
	</p>
	{#if data.exists}
		<button class="btn variant-filled-error" on:click={() => toggleUser(false)}>Turn off</button>
	{:else}
		<button class="btn variant-filled-success" on:click={() => toggleUser(true)}>Turn on</button>
	{/if}
</div>
