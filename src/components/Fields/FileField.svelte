<script>
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

	import { db, storage } from '$lib/firebase';
	import { doc, updateDoc } from 'firebase/firestore';

	export let id;
	export let idDoc;
	export let tipoImagen;
	export let name;
	export let label;
	export let required = false;
	export let urlImagen = '';
	export let accept = '';

	let archivo;

	function handleChange(event) {
		archivo = event.target.files[0];
	}

	async function cargarImagen() {
		if (archivo) {
			const storageRef = ref(storage, `${tipoImagen}/${idDoc}`);
			const snapshot = await uploadBytes(storageRef, archivo);
			return getDownloadURL(snapshot.ref);
		} else {
			console.log('Debe seleccionar un archivo');
		}
	}

	async function Iniciar() {
		urlImagen = await cargarImagen();
		const documentoRef = doc(db, 'cursos', idDoc);
		try {
			await updateDoc(documentoRef, { [tipoImagen]: urlImagen });
		} catch (error) {
			console.error('Error actualizando el documento: ', error);
		}
	}
</script>

<div>
	<label for="image" class="block text-sm text-gray-500 dark:text-gray-300">{label}</label>
	<div class="relative flex items-center mt-2">
		<button
			on:click={Iniciar}
			class="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 640 512"
				fill="currentColor"
				class="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
			>
				<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
				<path
					fill-rule="evenodd"
					d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
					clip-rule="evenodd"
				/></svg
			>
		</button>

		<input
			{id}
			{name}
			{required}
			{accept}
			on:change={handleChange}
			type="file"
			class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200"
		/>
	</div>
	<img src={urlImagen} alt="" />
</div>
