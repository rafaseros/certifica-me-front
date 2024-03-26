import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function persistente(key, valorInicial) {
	let data = valorInicial;

	if (browser) {
		const stored = localStorage.getItem(key);
		data = stored ? JSON.parse(stored) : valorInicial;
	}

	const store = writable(data);

	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

export const usuario = persistente('usuario', {
	uid: null,
	rol: null,
	photoUrl: null,
	displayName: null,
	email: null,
	emailVerified: false,
	puedeCrearCursos: false
});
