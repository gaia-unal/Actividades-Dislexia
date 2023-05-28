// Definición de variables globales

// Aquí queda el puntaje de esta actividad, 1 o 0
var puntaje = null;

var idSeleccion = null;

// Poner en la segunda cadena (que está vacía) el número de la opción correcta
// Aquí va la opción que es correcta para ser calificada
var idOpcionCorrecta = "opcion" + "2";

//Contenedor solo para guiarse
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Botón de continuar
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', procesarPuntaje, false);

function mostrarContinuar() {
	document.getElementById('continuar').style.display = "block";
}

// NO MOVER
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}

// NO MOVER
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
		// Aquí deberia enviarse el puntaje a una función global que procese el puntaje de toda la prueba
	}
}

// NO MOVER
function Error() {
	puntaje = 0;
}

// NO MOVER
function Correcto() {
	puntaje = 1;
}

// NO MOVER
function sonido(id) {
	// Verificamos que no haya ningun audio reproduciendose, o sino lo detenemos

	let audioElements = document.getElementsByClassName("audio-element");
    
    for (let i = 0; i < audioElements.length; i++) {
        let audio = audioElements[i];
        
        if (audio.id !== "audio" + id) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
	// Ahora reproducimos el audio que corresponde

	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// Evento cuando se selecciona alguna de las opciones
function seleccionar(id){
	
	sonido(id);
	id = "opcion"+id;
	console.log("El id del seleccionado es:", id);
	
	let opciones = document.getElementsByClassName("opciones");

	for(let i = 0; i < opciones.length; i++){
		let idOpcionActual = "opcion"+(i+1);
		document.getElementById(idOpcionActual).style.border = "none";
	}

	document.getElementById(id).style.border = "2px solid #28a745";

	idSeleccion = id;
	mostrarContinuar();
	calificar();
}

// NO MOVER
function calificar(){
	if (idSeleccion == idOpcionCorrecta){
		Correcto();
	}else{
		Error();
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