<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import { session, loading } from '$lib/utilities/stores';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
	import SvgSpinnersBarsScaleMiddle from '~icons/svg-spinners/bars-scale-middle';
	import IcBaselineLogout from '~icons/ic/baseline-logout';

	function logOut() {
		Cookies.remove('sessionId');
		Cookies.remove('password');
		$session = undefined;
		goto('/');
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">lunchautomate</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $session}
					<div class="flex justify-center divide-x divide-surface-900 dark:divide-surface-50">
						<strong class="px-2">{$session.username}</strong>
						<p class="px-2">{$session.subdomain}</p>
					</div>
					<button class="btn p-0" on:click={logOut}>
						<IcBaselineLogout />
					</button>
				{/if}
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/MichalUSER/lunchautomate"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="absolute w-full">
		<SvgSpinnersBarsScaleMiddle
			opacity={$loading ? '1' : '0'}
			class="w-6 h-6 z-10 block mx-auto mt-10 text-slate-700-100-token transition"
		/>
	</div>
	<main class="w-full h-full flex justify-center items-center">
		<slot />
	</main>
</AppShell>
