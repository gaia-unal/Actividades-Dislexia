
var idSiguiente = 0;

//Contenedor solo para guiarse
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Botón de continuar
var boton = document.getElementById('btn-continuar');

function mostrarContinuar(id) {
	document.getElementById('continuar').style.display = "block";
	// COnseguimos el idSiguiente que es el id del elemento que se va a mostrar, que se obtiene sumando 1 al id que llega a esta función
	idSiguiente = parseInt(id) + 1;
	console.log("El id siguiente es:", idSiguiente);
}

function mostrarSiguiente() {
	//Se muestra la imagen que tiene como nombre el idSiguiente
	//Pero primero, se oculta la imagen actual
	idActual = idSiguiente - 1;
	idActual = 'imagen' + idActual;
	document.getElementById(idActual).style.visibility = "hidden";
	// Ahora sí, se muestra la imagen siguiente
	idSiguiente = 'imagen' + idSiguiente;
	document.getElementById(idSiguiente).style.visibility = "visible";
}

// NO MOVER
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}
// Fin para reproducir sonido
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}


// Evento cuando se selecciona alguna de las opciones
function seleccionar(id){
	
	sonido(id);
	console.log("El id del seleccionado es:", id);

	mostrarContinuar(id);
}