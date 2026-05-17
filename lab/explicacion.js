// 1. Implementar GAME OVER al tocar los bordes
// En la función moverSerpiente, 
// capturo la posición de la nuevaCabeza
let nuevaCabeza = serpiente[0]

// Uso este condicional if para verificar si la serpiente intenta salirse de los límites:
if(
    // Primero reviso si x o y son menores a 0 (que serían las paredes izquierda y superior).
    nuevaCabeza.x < 0 || nuevaCabeza.y < 0 ||
    // Luego reviso si exceden el ancho o alto total del tablero dividido por el tamaño de la celda.
    // para convertir los píxeles del dibujo en unidades de juego 
    nuevaCabeza.x >= (canvas.width / TAMANIO_CELDA) || nuevaCabeza.y >= (canvas.height / TAMANIO_CELDA)
){
    // Si esto ocurre, llamo a la función gameOver() para detener el movimiento.
    gameOver()
    // Y uso un return para frenar la ejecución de inmediato 
    // Evitando que la serpiente se dibuje fuera del canvas.
    return
}

// 2. Implementar botón “Reiniciar juego” 
function reiniciarJuego(){
    // Limpio los intervalos de tiempo y movimiento para que no se acumulen en segundo plano.
    clearInterval(intervaloSerpiente)
    clearInterval(intervaloTiempo)
    
    // Actualizo el mensaje visual para indicar que la partida está lista de nuevo.
    mensajeElemento.innerText = "Elige dificultad o presiona INICIAR"
    
    // Devuelvo la serpiente a su posición y tamaño inicial, y reseteo la dirección.
    serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
    direccion = "derecha"
    
    // Cambio el estado para permitir el movimiento nuevamente y pongo el puntaje en cero.
    juegoTerminado = false
    puntaje = 0
    
    // Restauro la velocidad al valor original según el nivel elegido por el usuario.
    velocidad = velocidadBase
    
    // Reinicio el cronómetro a cero y actualizo los valores en pantalla.
    segundosTranscurridos = 0
    document.getElementById("tiempo").innerText = "00:00"
    document.getElementById("puntaje").innerText = 0
    document.getElementById("estado").innerText = "Listo"
    
    // Regenero la comida y dibujo todo para mostrar el tablero limpio.
    regenerarComida()
    dibujarTodo()
}

// 3. Aumentar la velocidad de avance 
// En lugar de usar un número fijo, utilizo la variable 'velocidad' para controlar 
// el tiempo de refresco en el setInterval de la función iniciarJuego().
let velocidad = 300
let velocidadBase = 300

// Dentro de la función aumentarPuntaje() 
// Programé una lógica para aumentar la dificultad cada 2 puntos
// Cuando esta condición valida que el residuo es igual a 0
if(puntaje % 2 === 0){
    
    // El intervalo de tiempo disminuye
    // Si la velocidad es mayor a 50, reducimos de 50 en 50
        if(velocidad > 50){
            velocidad = velocidad - 50
        } 
        // Si la velocidad está entre 11 y 50, reducimos de 10 en 10
        else if(velocidad > 10){
            velocidad = velocidad - 10
        } 
        // Si ya llegamos a 10, nos quedamos ahí (no bajamos más)
        else {
            velocidad = 10
        }
    
    // Llamo a iniciarJuego() nuevamente. 
    // Para limpiar el intervalo anterior 
    // y activar uno nuevo con el valor de 'velocidad' actualizado
    iniciarJuego()
}

//4. Agregar una funcionalidad adicional 
// CRONÓMETRO
function actualizarTiempo(){
    // Sumo un segundo cada vez que se ejecuta esta función mediante un intervalo independiente
    segundosTranscurridos++

    // Calculo los minutos dividiendo para 60 y los segundos con el operador residuo
    let minutos = Math.floor(segundosTranscurridos / 60)
    let segundos = segundosTranscurridos % 60

    // Implementé una validación para aplicar un formato de dos dígitos (00:00).
    // Asegurando que el cronómetro se vea bien en la interfaz.
    if(minutos < 10) minutos = "0" + minutos
    if(segundos < 10) segundos = "0" + segundos

    // Actualizo el elemento 'tiempo' en el HTML.
    document.getElementById("tiempo").innerText = minutos + ":" + segundos
}

// BLOQUEO DE AUTOGIRO
function cambiarDireccion(nuevaDireccion) {
    // Si la nueva dirección es opuesta a la actual, el código ignora la instrucción.
    if (direccion === "derecha" && nuevaDireccion === "izquierda") return;
    if (direccion === "izquierda" && nuevaDireccion === "derecha") return;
    if (direccion === "arriba" && nuevaDireccion === "abajo") return;
    if (direccion === "abajo" && nuevaDireccion === "arriba") return;

    // Solo si la dirección es válida
    // Actualizamos la variable
    direccion = nuevaDireccion;
}

// MENSAJES DE INTERFAZ EN EL CANVAS
