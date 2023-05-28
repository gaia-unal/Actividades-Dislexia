
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
// Fin para reproducir sonido
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
	// Reproducimos el audio que queremos
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
	mostrarContinuar();
}
