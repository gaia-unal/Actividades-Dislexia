// Definición de variables globales
// En puntaje va el valor del puntaje de la actividad
var puntaje = null;

// Acá va el valor de la respuesta correcta
var respuestaCorrectaDelInput = "las montañas son verdes"; 

// Acá se definen las acciones del botón continuar
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', procesarPuntaje, false);

//Solo hace parte del contenedor
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Función para mostrar el botón continuar
function mostrarContinuar() {
	document.getElementById('continuar').style.display = "block";
}

// Función para ocultar el botón continuar
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}

// Función para procesar el puntaje de la actividad
function procesarPuntaje() {
	console.log("Puntaje de la actividad: ", puntaje);
	if (puntaje == null || isNaN(puntaje)) {
		var texto = 'Por favor completa la actividad';
		if (typeof parent.mostrarAlerta === "function") {
			parent.mostrarAlerta(texto);
		} else {
			alert(texto);
		}
		ocultarContinuar();
	} else {
		//Aquí se envía el puntaje para que se procese de forma global
	}
}

// Función que coloca el puntaje en 0 cuando la actividad es incorrecta
function Error() {
	puntaje = 0;
	mostrarContinuar();
}

// Función que coloca el puntaje en 1 cuando la actividad es correcta
function Correcto() {
	puntaje = 1;
	mostrarContinuar();
}

// Función que reproduce el audio
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// NO MOVER
var input = document.getElementById('respuesta');
input.addEventListener('keyup', function (e) {
	// Se convierte a minúscula la entrada del usuario para evitar errores
	let valor = e.target.value.toLowerCase();
	calificar(valor);
});


// Función de calificación
function calificar(valor) {
	if (!valor) {
		ocultarContinuar();
		return false;
	}

	if (valor == respuestaCorrectaDelInput || valor == "verdes son las montañas") {
		Correcto();
		console.log('puntaje = 1')
	} else {
		Error();
		console.log('puntaje = 0')
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