// Variables globales
var puntaje = 0.01;

// Agregar los id de los div de las opciones correctas EN ORDEN ESTRICTO en forma de arreglo. Es decir, poner aquí los id de los objetos en el orden que se supone
// el usuario debería seleccionar para obtener una calificación perfecta.
// NOTA IMPORTANTE: En este tipo de actividad deben seleccionar todas las opciones, por eso el botón de continuar no aparecerá hasta que se hayan seleccionado
// todas las opciones que están listadas en el siguiente arreglo
var opcionesCorrectasEnOrden = ["opcion1", "opcion2"];

// Variables para guardar el valor de las opciones buenas y malas
var valorBueno = 1/opcionesCorrectasEnOrden.length;
var valorMalo = valorBueno/2;

// Variable para guardar las opciones que se han seleccionado
var seleccionadas = Array();

// Variable para guardar el id de la opción que se acaba de seleccionar
var idSeleccion = null;

// Aquí se tiene un borde para delimitar el área de la actividad
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// NO MOVER
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', procesarPuntaje, false);

// Función para mostrar el botón de continuar
function mostrarContinuar() {
	document.getElementById('continuar').style.display = "block";
}

// Función para ocultar el botón de continuar
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}

// Función para procesar el puntaje y enviarlo a la herramienta
function procesarPuntaje() {
	if (puntaje == null || isNaN(puntaje)) {
		var texto = 'Por favor completa la actividad';
		if (typeof parent.mostrarAlerta === "function") {
			parent.mostrarAlerta(texto);
		} else {
			alert(texto);
		}
		ocultarContinuar();
	} else {
		console.log("El puntaje es: ", puntaje);
		// Aquí se envía el puntaje para que se procese de forma global
	}
}

// Función para que se reproduzcan los audios
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// Función para renumerar las opciones según el orden en que han sido seleccionadas
function renumerarOpciones(){
	// Primero, ocultar el contenido de toda la segunda fila
	let numeracionesActuales = document.getElementsByTagName('p');
	for(let casilla of numeracionesActuales){
		casilla.style.visibility = 'hidden';
	}
	for(let i = 1; i <= opcionesCorrectasEnOrden.length; i++){
		document.getElementById("contenedorNumeracionOpcion"+i).style.visibility = 'hidden';
	}

	// Ahora, numerar según el orden en que han sido seleccionadas
	for(let i = 1; i <= seleccionadas.length; i++){
		let idActual = seleccionadas[i-1];
		// console.log("IdActual: ", idActual);
		let idActualMayusculaInicial = idActual.charAt(0).toUpperCase() + idActual.slice(1);
		let elementoNumeracionActual = document.getElementById("numeracion"+idActualMayusculaInicial);
		elementoNumeracionActual.innerHTML = i;
		elementoNumeracionActual.style.visibility = 'visible';
		let contenedorNumeracionActual = document.getElementById("contenedorNumeracion"+idActualMayusculaInicial);
		contenedorNumeracionActual.style.visibility = 'visible';
	}
}

// Evento que se activa cuando se selecciona una opción
function seleccionar(id){
	// Llamamos a la función para reproducir el audio de la sílaba
	sonido(id);

	id = "opcion"+id;
	// console.log("El id del seleccionado es:", id);

	// Si ya está seleccionada y la acaban de volver a pulsar, voy a quitar su selección
	if(seleccionadas.includes(id)){
		document.getElementById(id).style.border = "none";
		let indice = seleccionadas.indexOf(id);
		seleccionadas.splice(indice, 1);
		renumerarOpciones();
	}else{ // Si no está seleccionada, le pongo el borde y la guardo en el arreglo
		document.getElementById(id).style.border = "2px solid #00FF00";
		seleccionadas.push(id);
		renumerarOpciones();
	}
	
	// console.log("Las opciones seleccionadas hasta el momento son", seleccionadas);

	if(seleccionadas.length == opcionesCorrectasEnOrden.length){
		mostrarContinuar();
	}else{
		ocultarContinuar();
	}
	calificar();
}

// Función para cuando hay error
function Error() {
	puntaje = 0;
	console.log('el puntaje es ', puntaje);
}

// Función para cuando la respuesta es correcta
function Correcto() {
	puntaje = 1;
	console.log('el puntaje es ', puntaje);
}

// Función de calificar
function calificar(){
	puntaje = 0.0;
	let correctas = 0;
	for(let i = 0; i < opcionesCorrectasEnOrden.length; i++){
		if(seleccionadas[i] == opcionesCorrectasEnOrden[i]){
			puntaje += valorBueno;
			correctas += 1;
		}
	}
	puntaje = puntaje - ((valorMalo) * (seleccionadas.length - correctas));
	if(puntaje < 0){
		puntaje = 0;
		
	}
	else{
		if(puntaje == opcionesCorrectasEnOrden.length){
			Correcto();
		}
	}
}

// En caso de que el estudiante haya respondido correstamente, el modal dirá 'Muy bien', en caso de que no,
// deberá decir 'Inténtalo nuevamente'
function mostrarModal() {
	var mensaje = "";

	if (puntaje === 1) {
	  mensaje = "¡Muy bien! 😊";
	} else {
	  mensaje = "Inténtalo nuevamente, ¡Tú puedes! 😊";
	}
  
	$("#resultadoMensaje").text(mensaje);
	$("#resultadoModal").modal("show");
  }