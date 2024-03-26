<script>
	import { usuario } from '$lib/store';
	import LoginButton from './LoginButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
</script>

<header class="flex items-center justify-between h-20 px-6 bg-white border-b">
	<div class="relative flex items-center">
		<a
			href="/"
			class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white"
		>
			CertificaMe
		</a>
	</div>

	{#if $usuario.uid != null}
		<LogoutButton />
	{:else}
		<LoginButton />
	{/if}
</header>
