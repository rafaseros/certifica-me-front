<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

	import { db } from '$lib/firebase';
	import { usuario } from '$lib/store';
	import { obtenerCursos } from '$lib/cursos';

	import { convertirTimestampAFechaList } from '$lib/utils/timestampToDateList';

	import { loginWithGoogle } from '$lib/utils/loginWithGoogle';

	let cursos = [];

	onMount(async () => {
		cursos = await obtenerCursos();
		console.log(verificarRegistro(cursos));
	});

	function irNuevo() {
		goto('/curso');
	}

	async function registrarCurso(idCurso) {
		const cursoRef = doc(db, 'cursos', idCurso);

		const participante = {
			nombre: $usuario.displayName,
			correo: $usuario.email,
			estado: 'R'
		};

		try {
			await updateDoc(cursoRef, { participantes: arrayUnion(participante) });
			console.log('registrado con exito');
		} catch (error) {
			console.error('Error al registrar participante', error);
		}
	}

	function verificarRegistro() {
		console.log(cursos.id);
		return false;
	}
</script>

<div class="bg-white">
	<div class="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
		<div class="container flex items-center justify-between px-6 py-3 mx-auto">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900">Cursos y Talleres disponibles</h2>

			{#if $usuario.puedeCrearCursos}
				<button
					on:click={irNuevo}
					class="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						class="w-5 h-5 mx-1"
						fill="currentColor"
						><path
							d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
						/></svg
					>

					<span class="mx-1">Crear</span>
				</button>
			{/if}
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
			{#if cursos.length === 0}
				<p>Cargando cursos...</p>
			{:else}
				{#each cursos as curso}
					<div
						class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-10"
					>
						<img
							class="object-cover object-center w-full h-auto"
							src={curso.publicidadImage}
							alt="avatar"
						/>

						<div class="flex items-center px-6 py-3 bg-gray-900">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								aria-label="headphones icon"
								class="w-6 h-6 text-white fill-current"
								fill="none"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"
								/></svg
							>

							<h1 class="mx-3 text-lg font-semibold text-white">
								{curso.costo == 0 ? 'Gratis' : `${curso.costo} Bs.`}
							</h1>
						</div>

						<div class="px-6 py-4">
							<h1 class="text-xl font-semibold text-gray-800 dark:text-white">{curso.nombre}</h1>

							<p class="py-2 text-gray-700 dark:text-gray-400">
								{curso.descripcion}
							</p>

							<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									class="w-6 h-6 fill-current"
									><path
										d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
									/></svg
								>

								<h1 class="px-2 text-sm">{convertirTimestampAFechaList(curso.fecha)}</h1>
							</div>

							<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 384 512"
									aria-label="location pin icon"
									class="w-6 h-6 fill-current"
									fill="none"
								>
									<path
										d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
									/></svg
								>
								<h1 class="px-2 text-sm">{curso.lugar}</h1>
							</div>

							<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									class="w-6 h-6 fill-current"
									><path
										d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
									/></svg
								>
								<h1 class="px-2 text-sm">{`${curso.duracion} Minutos`}</h1>
							</div>
							<div class="flex items-center justify-center mt-4">
								{#if curso.facebook_url != ''}
									<a
										href={curso.facebook_url}
										class="mr-4 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
										tabindex="0"
										aria-label="twitter link"
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 320 512"
											aria-hidden="true"
											class="w-5 h-5 fill-current"
											><path
												d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
											/></svg
										>
									</a>
								{/if}
								{#if curso.whatsapp_url != ''}
									<a
										href={curso.whatsapp_url}
										class="mr-4 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
										tabindex="0"
										aria-label="share link"
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											aria-hidden="true"
											class="w-5 h-5 fill-current"
											fill="none"
											><path
												d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
											/></svg
										>
									</a>
								{/if}
								{#if curso.maps_url != ''}
									<a
										href={curso.maps_url}
										class="mr-4 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
										tabindex="0"
										aria-label="share link"
										target="_blank"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 576 512"
											class="w-5 h-5 fill-current"
											><path
												d="M565.6 36.2C572.1 40.7 576 48.1 576 56V392c0 10-6.2 18.9-15.5 22.4l-168 64c-5.2 2-10.9 2.1-16.1 .3L192.5 417.5l-160 61c-7.4 2.8-15.7 1.8-22.2-2.7S0 463.9 0 456V120c0-10 6.1-18.9 15.5-22.4l168-64c5.2-2 10.9-2.1 16.1-.3L383.5 94.5l160-61c7.4-2.8 15.7-1.8 22.2 2.7zM48 136.5V421.2l120-45.7V90.8L48 136.5zM360 422.7V137.3l-144-48V374.7l144 48zm48-1.5l120-45.7V90.8L408 136.5V421.2z"
											/></svg
										>
									</a>
								{/if}
							</div>
						</div>
						<div class="flex items-center justify-center px-4 py-2 bg-gray-900">
							{#if $usuario.uid}
								<button
									on:click={registrarCurso(curso.id)}
									class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
									>Registrarme</button
								>
							{:else if verificarRegistro()}
								<!-- else if content here -->
							{:else}
								<button
									on:click={loginWithGoogle}
									class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
								>
									Inicia Sesion para registrarte
								</button>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>
