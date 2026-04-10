<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/ui/card';
	import { Input } from '$lib/ui/input';
	import { Label } from '$lib/ui/label';
	import { Button } from '$lib/ui/button';
	import { authStore } from '$lib/stores/auth.svelte';
	import { onMount } from 'svelte';

	let { form } = $props();

	// Jika ada data user balik dari server (setelah login sukses tapi sebelum redirect selesai)
	// Namun biasanya redirect langsung mematikan state ini. 
	// Role biasanya di-set di Root Layout setelah load profile.
</script>

<div class="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
	<Card.Root class="w-full max-w-md shadow-xl">
		<Card.Header class="space-y-1">
			<Card.Title class="text-center text-2xl font-bold">Iris Svelte</Card.Title>
			<Card.Description class="text-center">
				Masukkan NIK dan Password Anda untuk masuk
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="username">NIK</Label>
					<Input 
						id="username" 
						name="username" 
						placeholder="Masukkan NIK" 
						required 
						class={form?.error ? 'border-destructive' : ''}
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input 
						id="password" 
						name="password" 
						type="password" 
						placeholder="••••••••" 
						required 
					/>
				</div>

				{#if form?.error}
					<div class="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
						{form.message}
					</div>
				{/if}

				<Button type="submit" class="w-full">
					Masuk
				</Button>
			</form>
		</Card.Content>
	</Card.Root>
</div>
