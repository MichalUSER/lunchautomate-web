<script lang="ts">
	import { URL } from '$lib/utilities/config';
	import { loading } from '$lib/utilities/stores';
	import Cookies from 'js-cookie';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let text = '';

	async function onSubmit(e: Event) {
		$loading = true;
		const formEl = e.target as HTMLFormElement;
		const data = new FormData(formEl);
		const formData = Object.fromEntries(data.entries());
		try {
			const res = await fetch(`${URL}/authenticate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				// credentials: 'include',
				body: JSON.stringify(formData)
			});
			if (!res.ok) throw 'Invalid credentials';
			const password = formData.password.toString();
			Cookies.set('password', password, { sameSite: 'None', secure: true });
			const data = await res.json();
			for (const cookie of data.cookies) {
				Cookies.set(cookie.key, cookie.value, { sameSite: 'None', secure: true });
			}

			text = 'Success';
			dispatch('success');
		} catch (e: any) {
			text = e;
		}
		$loading = false;
	}
</script>

<main class="w-full h-full flex justify-center items-center">
	<form
		class="flex flex-col gap-y-14 items-center rounded-md px-14 py-10 w-full max-w-md drop-shadow-xl bg-surface-200-700-token"
		on:submit|preventDefault={onSubmit}
	>
		<h2>EduPage Login</h2>
		<div class="w-full flex flex-col items-center gap-y-3">
			<label class="label w-full">
				<span>Username</span>
				<input type="text" name="username" class="input" />
			</label>
			<label class="label w-full">
				<span>Password</span>
				<input type="password" name="password" class="input" />
			</label>
			<label class="label w-full">
				<span>Subdomain</span>
				<input type="text" name="subdomain" class="input" />
			</label>
		</div>
		<p
			class={text == 'Success' ? 'text-success-500' : 'text-error-900 dark:text-error-400'}
			hidden={text.length == 0}
		>
			{text}
		</p>
		<button class="btn variant-filled-primary">Login</button>
	</form>
</main>

<style lang="postcss">
	.input {
		@apply py-3 px-5;
	}
	.btn {
		@apply px-8 py-3;
	}
</style>
