<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import { goto } from '$app/navigation';
</script>

<Login on:success={() => goto('/app')} />
