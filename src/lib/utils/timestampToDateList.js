export function convertirTimestampAFechaList(timestamp) {
	// Crear un objeto Date a partir del Timestamp de Firestore
	let fecha = timestamp.toDate(); // Convierte el Timestamp a un objeto Date de JavaScript

	fecha.setTime(fecha.getTime() - 4 * 60 * 60 * 1000);

	// Convertir la fecha a una cadena ISO
	let fechaISO = fecha.toISOString(); // Convierte el objeto Date a una cadena en formato ISO

	// Ajustar la cadena ISO para que coincida con el formato deseado (YYYY-MM-DDTHH:mm)
	// La función slice se utiliza para recortar los segundos y la designación de zona horaria
	let fechaFormateada = fechaISO.slice(0, 10);
	let horaFormateada = fechaISO.slice(11, 16);

	return `${fechaFormateada} a las ${horaFormateada}`;
}
