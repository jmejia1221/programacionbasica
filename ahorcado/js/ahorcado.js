var palabra = "Tamarindo";
var hombre, l, espacio; // Variables Global


//Declaración de la clase ahorcado
var Ahorcado = function(con){
	// This es las variables locales de la clase, accesibles en toda la clase
	// This.contexto es el context del dibujo del canvas, que llega por parametro desde la variable con
	this.contexto = con;
	this.max = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();
}

Ahorcado.prototype.dibujar = function(){
	var dibujo = this.contexto;

	//Dibujando el poste
	dibujo.beginPath(); // Inicio el trazo
	dibujo.moveTo(150,100); // LLeva el cursor a estas cordenadas
	dibujo.lineTo(150,50); // Dibujo la linea
	dibujo.lineTo(400,50);
	dibujo.lineTo(400,350);
	dibujo.lineWidth = 15; // Ancho de la linea en pixeles
	dibujo.strokeStyle = "#000";
	dibujo.stroke(); // Todo lo que dibujé no aparece en pantalla hasta poner esta linea
	dibujo.closePath(); // Cierro el trazo

	if (this.intentos > 0){
		// Intentos == 1 -- > Dibujar rostro
		dibujo.beginPath(); // Arranco otro trazo o camino
		dibujo.arc(150,140,40,0,Math.PI * 2 , false); // Para dibujar un circulo (x,y,radio,radianes inicio, radianes finaliza, manecillas del reloj = false or true)
		dibujo.strokeStyle = "#f00";
		dibujo.lineWidth = 5;
		dibujo.stroke();
		dibujo.closePath();
		if (this.intentos > 1){
			// Intentos > 1 -- > Dibujar torso
			dibujo.beginPath(); // Arranco otro trazo o camino
			dibujo.moveTo(150,180);
			dibujo.lineTo(150,250);
			dibujo.strokeStyle = "#f00";
			dibujo.lineWidth = 5;
			dibujo.stroke();
			dibujo.closePath();
			if (this.intentos > 2) {
				// Intentos > 2 -- > Dibujar brazos
				dibujo.beginPath(); // Arranco otro trazo o camino
				dibujo.moveTo(120,220);
				dibujo.lineTo(150,180);
				dibujo.lineTo(180,220);
				dibujo.strokeStyle = "#f00";
				dibujo.lineWidth = 5;
				dibujo.stroke();
				dibujo.closePath();
				if (this.intentos > 3) {
					// Intentos > 3 -- > Dibujar Piernas
					dibujo.beginPath(); // Arranco otro trazo o camino
					dibujo.moveTo(120,290);
					dibujo.lineTo(150,250);
					dibujo.lineTo(180,290);
					dibujo.strokeStyle = "#f00";
					dibujo.lineWidth = 5;
					dibujo.stroke();
					dibujo.closePath();
					if (this.intentos > 4) {
						// Intentos > 4 -- > Dibujar Ojos muertos
						dibujo.beginPath(); // Arranco otro trazo o camino

						// Ojo Izquierdo
						dibujo.moveTo(125,120);
						dibujo.lineTo(145,145);
						dibujo.moveTo(145,120); // Levantar el cursor
						dibujo.lineTo(125,145);

						// Ojo Derecho
						dibujo.moveTo(155,120);
						dibujo.lineTo(175,145);
						dibujo.moveTo(175,120); // Levantar el cursor
						dibujo.lineTo(155,145);


						dibujo.strokeStyle = "blue";
						dibujo.lineWidth = 5;
						dibujo.stroke();
						dibujo.closePath();
					};
				};
			};
		}
	}
}

Ahorcado.prototype.trazar = function(){
	this.intentos++;

	if(this.intentos >= this.max){
		this.vivo = false;
		alert("Estas muerto !");
	}

	this.dibujar();
}

function iniciar(){

	var canvas = document.getElementById("c");

	l = document.getElementById("letra");
	var b = document.getElementById("boton");

	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d"); // Esta variable solo funciona dentro esta función
	hombre = new Ahorcado(contexto);

	//toUpperCase(); convierte texto a mayúscula
	palabra = palabra.toUpperCase();

	// Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);
	
	// Agregamos una función que se dispare al dar click al botón

	b.addEventListener("click", agregarLetra);

	mostrarPista(espacio);

};

function agregarLetra(){
	var letra = l.value;
	l.value = "";
	mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra, ahorcado, letra){
	var encontrado = false;
	var p;
	letra = letra.toUpperCase();

	for (p in palabra){
		if(letra == palabra[p]){
			espacio[p] = letra;
			encontrado = true;
		}
	}
	mostrarPista(espacio);

	// Si no lo encontré

	if(!encontrado){
		ahorcado.trazar();
	}

	if(!ahorcado.vivo){
		// Mostrar la palabra entera
	}
}

function mostrarPista(espacio){
	var pista = document.getElementById("pista");
	var texto = "";
	var i;
	var largo = espacio.length;

	for ( i = 0; i<largo; i++){

		if (espacio[i] != undefined) 
		{
			texto = texto + espacio[i] + " ";
		}else{
			texto += "_ ";
		};
	}

	pista.textContent = texto;

}