// Global variables
var puntaje = 0.01;

// Add the IDs of the correct options STRICTLY IN ORDER as an array. 
// In this type of activity, all options must be selected, so the continue
// button won't appear until all options listed in the following array 
// have been selected.
var opcionesCorrectasEnOrden = ["opcion1", "opcion2", "opcion3","opcion4"];

// Variables to store the values of good and bad options
var valorBueno = 1/opcionesCorrectasEnOrden.length;
var valorMalo = valorBueno/2;

// Variable to store the selected options
var seleccionadas = Array();

// Variable to store the ID of the just-selected option
var idSeleccion = null;

// Border to set limits in the activity
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Continue Button
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', function() {
	// Send a message to the React component in the parent
	procesarPuntaje();
	window.parent.postMessage(puntaje, '*');
  });

// To change the font

// Obtain the elements to which the font must be changed
const changeFontButton = document.getElementById("changeFont");
const textElement = document.getElementById("texto");
const number1 = document.getElementById("numeracionOpcion1");
const number2 = document.getElementById("numeracionOpcion2");
const number3 = document.getElementById("numeracionOpcion3");
const number4 = document.getElementById("numeracionOpcion4");

// Define available fonts
const fonts = ["Open-Dyslexic", "Arial"]
let actualFont = 0;

// Define the available images, for each type of font
const images = [
	["opcion1-Open-Dyslexic.png", "opcion1-Arial.png"],
	["opcion2-Open-Dyslexic.png", "opcion2-Arial.png"],
	["opcion3-Open-Dyslexic.png", "opcion3-Arial.png"],
	["opcion4-Open-Dyslexic.png", "opcion4-Arial.png"]
];
let imagenActual = 0;

// When the button is clicked
changeFontButton.addEventListener("click", () => {
	// Change the text font of the required elements
    actualFont = (actualFont + 1) % fonts.length;
    textElement.style.fontFamily = fonts[actualFont];
	changeFontButton.style.fontFamily = fonts[actualFont];
	number1.style.fontFamily = fonts[actualFont];
	number2.style.fontFamily = fonts[actualFont];
	number3.style.fontFamily = fonts[actualFont];
	number4.style.fontFamily = fonts[actualFont];
	boton.style.fontFamily = fonts[actualFont];

	// Change the option images
	imagenActual = (imagenActual + 1) % images[0].length;

    document.getElementById("imageOption0").src = images[2][imagenActual];
    document.getElementById("imageOption1").src = images[1][imagenActual];
    document.getElementById("imageOption2").src = images[0][imagenActual];
    document.getElementById("imageOption3").src = images[3][imagenActual];
});

// Function to show the continue button
function mostrarContinuar() {
	document.getElementById('continuar').style.display = "flex";
}

// Function to hide the continue button
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}

// Function to process the score and send it to the tool
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

// Function to play audio
function sonido(id) {
	// Check if any audio is currently playing and stop it if so

	let audioElements = document.getElementsByClassName("audio-element");
    
    for (let i = 0; i < audioElements.length; i++) {
        let audio = audioElements[i];
        
        if (audio.id !== "audio" + id) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
	// Play the desired audio
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
}

// Function to renumber options based on the order they've been selected
function renumerarOpciones(){
	// First, hide the content of the entire second row
	let numeracionesActuales = document.getElementsByTagName('p');
	for(let casilla of numeracionesActuales){
		casilla.style.visibility = 'hidden';
	}
	for(let i = 1; i <= opcionesCorrectasEnOrden.length; i++){
		document.getElementById("contenedorNumeracionOpcion"+i).style.visibility = 'hidden';
	}

	// Now, number them based on the order they've been selected
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

// If it's already selected and they click it again, I will remove its selection
if(seleccionadas.includes(id)){
		document.getElementById(id).style.border = "none";
		let indice = seleccionadas.indexOf(id);
		seleccionadas.splice(indice, 1);
		renumerarOpciones();
	}else{ // If it's not selected, I put a border around it and store it in the array		document.getElementById(id).style.border = "2px solid #00FF00";
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

// Function for when there is an error
function Error() {
	puntaje = 0;
	console.log('el puntaje es ', puntaje);
}

// Function for when the answer is correct
function Correcto() {
	puntaje = 1;
	console.log('el puntaje es ', puntaje);
}

// Scoring function
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