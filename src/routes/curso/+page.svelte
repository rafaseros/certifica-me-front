<script>
	import { goto } from '$app/navigation';

	import { doc, setDoc, collection, Timestamp } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	import DateField from '../../components/Fields/DateField.svelte';
	import NumberField from '../../components/Fields/NumberField.svelte';
	import TextAreaField from '../../components/Fields/TextAreaField.svelte';
	import TextField from '../../components/Fields/TextField.svelte';
	import UrlField from '../../components/Fields/UrlField.svelte';

	import { usuario } from '$lib/store';
	import { cursoModel } from '$lib/models/cursoModel';

	let cursoData = cursoModel();

	async function guardarCurso() {
		const docRef = doc(collection(db, 'cursos'));
		await setDoc(docRef, {
			...cursoData,
			creador: $usuario.uid,
			fecha: Timestamp.fromDate(new Date(cursoData.fecha))
		});

		goto(`/curso/${docRef.id}`);
	}
</script>

<section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
	<h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Nuevo Curso</h2>

	<form on:submit|preventDefault={guardarCurso}>
		<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
			<TextField id="nombre" name="nombre" label="Nombre" required bind:value={cursoData.nombre} />
			<DateField id="fecha" name="fecha" label="Fecha" required bind:value={cursoData.fecha} />
		</div>
		<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
			<TextAreaField
				id="descripcion"
				name="descripcion"
				label="Descripción"
				required
				bind:value={cursoData.descripcion}
			/>
		</div>
		<div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
			<NumberField
				id="duracion"
				name="duracion"
				label="Duración"
				required
				bind:value={cursoData.duracion}
			/>
			<NumberField id="costo" name="costo" label="Costo" required bind:value={cursoData.costo} />
			<TextField id="lugar" name="lugar" label="Lugar" required bind:value={cursoData.lugar} />
			<UrlField
				id="maps_url"
				name="maps_url"
				label="Ubicación en Google Maps"
				bind:value={cursoData.maps_url}
			/>
			<UrlField
				id="facebook_url"
				name="facebook_url"
				label="Link de FaceBook"
				bind:value={cursoData.facebook_url}
			/>
			<UrlField
				id="whatsapp_url"
				name="whatsapp_url"
				label="Link de Whatsapp"
				bind:value={cursoData.whatsapp_url}
			/>
		</div>
		<div class="flex justify-end mt-6">
			<button
				class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
				>Crear Curso</button
			>
		</div>
	</form>
</section>
