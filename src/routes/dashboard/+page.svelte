<script lang="ts">
	import { authStore } from '$lib/stores/auth.svelte';
</script>

<div class="p-8">
	<h1 class="text-3xl font-bold">Dashboard</h1>
	<p class="mt-4 text-zinc-600">Selamat datang kembali!</p>
	
	<div class="mt-8 rounded-lg border bg-card p-6 shadow-sm">
		<h2 class="text-xl font-semibold">Status Auth</h2>
		<p class="mt-2">Role: <span class="font-mono text-primary">{authStore.role ?? 'Loading...'}</span></p>
	</div>
</div>
