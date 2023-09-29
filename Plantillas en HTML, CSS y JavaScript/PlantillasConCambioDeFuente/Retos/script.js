
// Container only for reference
document.getElementsByClassName("contenedor")[0].style.border="solid black";

// Function to show the continue button
function mostrarContinuar() {
	document.getElementById('continuar').style.display = "flex";
}

// Function to hide the continue button
function ocultarContinuar() {
	document.getElementById('continuar').style.display = "none";
}
// Function to play sound
function sonido(id) {
	let audio = document.getElementById("audio"+id);
	console.log(audio);
	audio.pause();
	audio.currentTime = 0;
	audio.play();
	mostrarContinuar();
}

// To change the font

// Obtain the elements to which the font must be changed
const changeFontButton = document.getElementById("changeFont");
const textElement = document.getElementById("texto");
var boton = document.getElementById('btn-continuar');
boton.addEventListener('click', function() {
	// Send a message to the React component in the parent
	window.parent.postMessage('puntaje', '*');
  });

// Obtain the elements to which the image must be changed
const imageElement = document.getElementById("imagen1");

// Define available fonts
const fonts = ["Open-Dyslexic", "Arial"]
let actualFont = 0;

// Define the available images, for each type of font
const images = ["imagenTrabalenguas1-Open-Dyslexic.png", "imagenTrabalenguas1-Arial.png"];
let imagenActual = 0;

// When the button is clicked
changeFontButton.addEventListener("click", () => {
	// Change the text font of the required elements
    actualFont = (actualFont + 1) % fonts.length;
    textElement.style.fontFamily = fonts[actualFont];
	changeFontButton.style.fontFamily = fonts[actualFont];
	boton.style.fontFamily = fonts[actualFont];

	// Change the required images
	imagenActual = (imagenActual + 1) % images.length;
    imageElement.src = images[imagenActual];
});
