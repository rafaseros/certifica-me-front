import { db } from '$lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const obtenerCursos = async () => {
	const cursosCol = collection(db, 'cursos');
	const cursosSnapshot = await getDocs(cursosCol);
	const cursosList = cursosSnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	}));
	return cursosList;
};
