<script lang="ts">
	import '../app.css';
	import { authStore } from '$lib/stores/auth.svelte';

	let { data, children } = $props();

	// Sync server-side user data to client-side store
	$effect(() => {
		if (data.user) {
			authStore.setUser(data.user.username, data.user.role);
		} else {
			authStore.clear();
		}
	});
</script>

{@render children()}
