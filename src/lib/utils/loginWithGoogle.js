import { auth, provider } from '$lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { usuario } from '$lib/store';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '$lib/firebase';

let rol = 'Participante';
let puedeCrearCursos = false;

export async function loginWithGoogle() {
	try {
		const result = await signInWithPopup(auth, provider);
		const uFireBase = result.user;

		const docRef = doc(db, 'usuarios', uFireBase.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			rol = docSnap.data().rol;
			puedeCrearCursos = docSnap.data().habilitadoParaCrearCursos;
		}

		usuario.set({
			uid: uFireBase.uid,
			rol: rol,
			photoUrl: uFireBase.photoURL,
			displayName: uFireBase.displayName,
			email: uFireBase.email,
			emailVerified: uFireBase.emailVerified,
			puedeCrearCursos: puedeCrearCursos
		});
	} catch (error) {
		console.error('Error en la autenticacion: ', error);
	}
}
