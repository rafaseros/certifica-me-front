<script>
	import { goto } from '$app/navigation';

	import { auth } from '$lib/firebase';
	import { usuario } from '$lib/store';

	let isOpen = false;

	function cerrarSesion() {
		auth
			.signOut()
			.then(() => {
				usuario.set({
					uid: null,
					rol: null,
					photoUrl: null,
					displayName: null,
					email: null,
					emailVerified: false,
					permisos: {
						puedeCrearCursos: false
					}
				});

				goto('/');
			})
			.catch((error) => {
				console.error('Error al cerrar sesión:', error);
			});
	}
</script>

<div class="flex items-center">
	<div class="relative">
		<span class="sr-only">User Menu</span>
		<div class="flex items-center md:-mx-2">
			<div class="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight">
				<span class="font-semibold text-sm text-gray-800">{$usuario.displayName}</span>
				<span class="text-sm text-gray-600">{$usuario.email}</span>
			</div>

			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img
				class="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2"
				src={$usuario.photoUrl}
				alt="user profile photo"
			/>
		</div>
	</div>

	<button
		on:click={cerrarSesion}
		class="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
	>
		<span class="sr-only">Log out</span>

		<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
			/>
		</svg>
	</button>
</div>
