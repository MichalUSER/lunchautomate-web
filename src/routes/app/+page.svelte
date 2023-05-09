<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { URL } from '$lib/utilities/config';
	import { session } from '$lib/utilities/stores';
	import Cookies from 'js-cookie';
	import SvgSpinnersBarsScaleMiddle from '~icons/svg-spinners/bars-scale-middle';
	import type { PageData } from './$types';

	export let data: PageData;
	$session = data.session;

	let loading = false;

	async function toggleUser(state: boolean) {
		loading = true;
		const endpoint = state ? 'add_lunch_cron' : 'remove_lunch_cron';
		const url = `${URL}/${endpoint}`;
		const credentials = {
			username: Cookies.get('username'),
			password: Cookies.get('password'),
			subdomain: Cookies.get('subdomain')
		};
		await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		});
		await invalidateAll();
		loading = false;
	}
</script>

<main class="flex flex-col w-full h-full items-center justify-center">
	<div class="flex flex-col items-center gap-y-10 card p-5 w-full max-w-md">
		<SvgSpinnersBarsScaleMiddle
			opacity={loading ? '1' : '0'}
			class="w-6 h-6 fixed z-20 top-5 text-slate-700-100-token transition"
		/>
		<h3>Status</h3>
		<p>
			Ordering lunches: <span
				class="font-bold text-md ml-1 {data.exists ? 'text-success-800' : 'text-error-500'}"
				>{data.exists ? 'ON' : 'OFF'}</span
			>
		</p>
		{#if data.exists}
			<button class="btn variant-filled-error" on:click={() => toggleUser(false)}>Turn off</button>
		{:else}
			<button class="btn variant-filled-success" on:click={() => toggleUser(true)}>Turn on</button>
		{/if}
	</div>
</main>
