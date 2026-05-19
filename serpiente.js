// serpiente.js
const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")

let serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
let intervaloSerpiente
let direccion = "derecha"
let comida = {x: 5,y: 5}
let puntaje = 0
let juegoTerminado = false
let velocidad = 300
let velocidadBase = 300
let segundosTranscurridos = 0
let intervaloTiempo

const mensajeElemento = document.getElementById("mensaje")

dibujarTodo()

function pintarCoordenada(x,y,color){
    let pixelX = x*TAMANIO_CELDA
    let pixelY = y*TAMANIO_CELDA
    ctx.fillStyle=color
    ctx.fillRect(pixelX,pixelY,TAMANIO_CELDA,TAMANIO_CELDA)
}

function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function dibujarSerpiente(){
    for(let i=0; i<serpiente.length; i++){
        const segmento = serpiente[i]
        const color = (i===0) ? "red" : "yellow"
        pintarCoordenada(segmento.x,segmento.y,color)
    }
}

function dibujarLineasVerticales(){
    for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){
        ctx.strokeStyle = "purple"
        ctx.beginPath()
        ctx.moveTo(x,0)
        ctx.lineTo(x,canvas.height)
        ctx.stroke()
    }
}

function dibujarLineasHorizontales(){
    for(let y = 0; y <= canvas.height; y+= TAMANIO_CELDA){
        ctx.strokeStyle = "purple"
        ctx.beginPath()
        ctx.moveTo(0,y)
        ctx.lineTo(canvas.width,y)
        ctx.stroke()
    }
}

function dibujarTablero(){
    dibujarLineasVerticales()
    dibujarLineasHorizontales()
    dibujarNumerosEnY()
    dibujarNumerosEnX()
}

function dibujarNumerosEnY(){
    ctx.fillStyle="white"
    ctx.font="12px Arial"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"

    let numeroCelda = 0
    for(let y=0; y <= canvas.height; y+= TAMANIO_CELDA){
        ctx.fillText(numeroCelda, (TAMANIO_CELDA/2), y + (TAMANIO_CELDA/2) )
        numeroCelda++
    }
}

function dibujarNumerosEnX(){
    ctx.fillStyle="white"
    ctx.font="12px Arial"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    
    let numeroCelda = 0
    for(let x=0; x <= canvas.width; x+= TAMANIO_CELDA){
        ctx.fillText(numeroCelda, x + (TAMANIO_CELDA/2), (TAMANIO_CELDA/2) )
        numeroCelda++
    }
}

function dibujarMensajeInicio(){
    // Fondo
    ctx.fillStyle = "rgba(0, 0, 0, 0.91)"  // ← Un poco más opaco
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Contorno para todos los textos
    ctx.strokeStyle = "black"  // Color del borde
    ctx.lineWidth = 3          // Grosor del borde
    
    // === TÍTULO PRINCIPAL ===
    ctx.fillStyle = "#22c55e"
    ctx.font = "bold 24px Arial" 
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    
    // Primero el contorno, luego el relleno
    ctx.strokeText("🐍 JUEGO DE LA SERPIENTE", canvas.width/2, canvas.height/2 - 60)
    ctx.fillText("🐍 JUEGO DE LA SERPIENTE", canvas.width/2, canvas.height/2 - 60)
    
    // === INSTRUCCIONES ===
    ctx.fillStyle = "white"
    ctx.font = "18px Arial"
    ctx.strokeText("Usa las flechas ⬆️⬇️⬅️➡️ para moverte", canvas.width/2, canvas.height/2 + 10)
    ctx.fillText("Usa las flechas ⬆️⬇️⬅️➡️ para moverte", canvas.width/2, canvas.height/2 + 10)
    
    // === MENSAJE DE ACCIÓN ===
    ctx.fillStyle = "#facc15"
    ctx.font = "bold 20px Arial"
    ctx.strokeText("¡Presiona INICIAR para comenzar!", canvas.width/2, canvas.height/2 + 50)
    ctx.fillText("¡Presiona INICIAR para comenzar!", canvas.width/2, canvas.height/2 + 50)

    // === NIVEL ===
    ctx.fillStyle = "#00ff0d"
    ctx.font = "14px Arial"
    ctx.strokeText("Selecciona un NIVEL de dificultad arriba 👆", canvas.width/2, canvas.height/2 + 90)
    ctx.fillText("Selecciona un NIVEL de dificultad arriba 👆", canvas.width/2, canvas.height/2 + 90)
}

function dibujarMensajePausa(){
    // Fondo
    ctx.fillStyle = "rgba(0, 0, 0, 0.90)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Configurar contorno para todos los textos
    ctx.strokeStyle = "black"   // Color del borde
    ctx.lineWidth = 2           // Grosor del borde
    
    // Mensaje principal "JUEGO PAUSADO"
    ctx.fillStyle = "red"
    ctx.font = "bold 24px Arial"  // ← Reducido de 30px a 24px para que quepa bien
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    
    // Primero el contorno, luego el relleno (¡orden importante!)
    ctx.strokeText("⏸️ JUEGO PAUSADO", canvas.width/2, canvas.height/2)
    ctx.fillText("⏸️ JUEGO PAUSADO", canvas.width/2, canvas.height/2)
    
    // Instrucción secundaria
    ctx.fillStyle = "#eeff00"  // Gris claro
    ctx.font = "16px Arial"
    
    ctx.strokeText("Presiona INICIAR para continuar", canvas.width/2, canvas.height/2 + 40)
    ctx.fillText("Presiona INICIAR para continuar", canvas.width/2, canvas.height/2 + 40)
}

function dibujarTodo(){
    limpiarCanvas()
    dibujarTablero()
    dibujarSerpiente()
    dibujarComida()

    let estadoActual = document.getElementById("estado").innerText

    if(estadoActual === "Listo"){
        dibujarMensajeInicio()
    }
    else if(estadoActual === "Pausado"){
        dibujarMensajePausa()
    }
}

function moverDerecha(){
    let nuevaCabeza = {
        x: serpiente[0].x+1,
        y:serpiente[0].y
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()//Elimina el último elemento del arreglo.
}

function moverIzquierda(){
    let nuevaCabeza = {
        x: serpiente[0].x-1,
        y:serpiente[0].y
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()//Elimina el último elemento del arreglo.
}

function moverArriba(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y-1
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()//Elimina el último elemento del arreglo.
}

function moverAbajo(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y+1
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()//Elimina el último elemento del arreglo.
}

function cambiarDireccion(nuevaDireccion) {
    // Evitar que la serpiente retroceda sobre sí misma
    /*
    EXAMEN
    Implementar una validación que impida que la serpiente se mueva en la dirección opuesta a la actual.

    La lógica implementada trabaja mediante tres componentes de JavaScript:
    
    El Condicional (if): 
    Pregunta. 
    si la dirección actual (direccion)
        y la tecla presionada (nuevaDireccion)
        son opuestas
    Si la respuesta es sí, ejecuta el return para congelar la función; 
    si es no, deja pasar el código a la siguiente línea.

    La Comparación Estricta (===): 
    Garantiza que el texto guardado en la memoria coincida exactamente con la dirección analizada 
    (por ejemplo, que "derecha" sea exactamente igual a "derecha"), evitando errores de lectura.

    El Operador Lógico AND (&&): 
    Obliga a que ambas condiciones se cumplan al mismo tiempo. 
    La lógica solo se activa si, además, intentas presionar la izquierda en ese preciso instante.
    */
    if (direccion === "derecha" && nuevaDireccion === "izquierda") return;
    if (direccion === "izquierda" && nuevaDireccion === "derecha") return;
    if (direccion === "arriba" && nuevaDireccion === "abajo") return;
    if (direccion === "abajo" && nuevaDireccion === "arriba") return;
    direccion = nuevaDireccion;
}

function configurarDificultad(ms) {
    velocidad = ms
    velocidadBase = ms
    let nivel = ""
    if(ms === 300) nivel = "Fácil"
    else if(ms === 150) nivel = "Medio"
    else if(ms === 50) nivel = "Difícil"
    
    mensajeElemento.innerText = "Dificultad: " + nivel + ". ¡Presiona INICIAR!"
}

function moverSerpiente(){
    if(juegoTerminado) return
    
    switch(direccion){
        case "derecha":
            moverDerecha()
            break
        case "izquierda":
            moverIzquierda()
            break
        case "arriba":
            moverArriba()
            break
        case "abajo":
            moverAbajo()
            break
    }

    for (let i = 1; i < serpiente.length; i++) {
        if (serpiente[0].x === serpiente[i].x && serpiente[0].y === serpiente[i].y) {
            gameOver()
            return 
        }
    }

    if(comidaAtrapada()){
        aumentarPuntaje()
        regenerarComida()
// Guarda en una variable llamada 'cola'
// La última posición disponible
// De la lista llamada 'serpiente' 
        let cola = serpiente[serpiente.length -1 ]
// Crea un objeto nuevo, 
// mira qué número tiene la cola en su x y dáselo a mi nueva x; 
// luego mira qué número tiene la cola en su y y dáselo a mi nueva y
        serpiente.push({ x: cola.x, y: cola.y })
    }

    let nuevaCabeza = serpiente[0]
    // Si la cabeza ha sobrepasado los límites
    if(
        nuevaCabeza.x < 0 || nuevaCabeza.x >= (canvas.width / TAMANIO_CELDA)// Bordes izquierdo y derecho
        ||
        nuevaCabeza.y < 0 || nuevaCabeza.y >= (canvas.height / TAMANIO_CELDA)// Bordes superior e inferior
    ){
        gameOver()
        return
    }

    dibujarTodo()

}

function dibujarComida(){
    pintarCoordenada(comida.x, comida.y, "green")
}

function comidaAtrapada(){
    return serpiente[0].x === comida.x && serpiente[0].y === comida.y
}

function regenerarComida(){
    comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA))
    comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA))
}

function aumentarPuntaje(){
    puntaje++
    document.getElementById("puntaje").innerText = puntaje

    // Aumentar velocidad cada 2 puntos
    if(puntaje % 2 === 0){
        
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
        
        iniciarJuego()
    }
}

function actualizarTiempo(){
    // Sumar 1 segundo cada vez que se llama esta función
    segundosTranscurridos++
    
    // Calcular minutos y segundos
    let minutos = Math.floor(segundosTranscurridos / 60)
    let segundos = segundosTranscurridos % 60
    
    // Agregar un cero adelante si es menor a 10 (ej: 05 en vez de 5)
    if(minutos < 10){
        minutos = "0" + minutos
    }
    if(segundos < 10){
        segundos = "0" + segundos
    }
    
    // Mostrar en pantalla
    document.getElementById("tiempo").innerText = minutos + ":" + segundos
}

function gameOver(){
    document.getElementById("estado").innerText = "Game Over"
    mensajeElemento.innerText = "¡Chocaste! Presiona REINICIAR para intentar de nuevo"
    juegoTerminado = true // Cambia el estado para detener movimientos futuros
    clearInterval(intervaloSerpiente)
    clearInterval(intervaloTiempo)
}

function reiniciarJuego(){
    clearInterval(intervaloSerpiente)
    clearInterval(intervaloTiempo)
    mensajeElemento.innerText = "Elige dificultad o presiona INICIAR"
    
    serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
    direccion = "derecha"
    juegoTerminado = false
    puntaje = 0
    velocidad = velocidadBase
    
    segundosTranscurridos = 0
    document.getElementById("tiempo").innerText = "00:00"
    
    document.getElementById("puntaje").innerText = 0
    document.getElementById("estado").innerText = "Listo"
    
    regenerarComida()
    dibujarTodo()
}

function iniciarJuego(){
    if(juegoTerminado){
        juegoTerminado = false
    }
    
    mensajeElemento.innerText = "¡Juego en marcha! Usa las flechas 🐍"
    document.getElementById("estado").innerText = "Jugando"

    clearInterval(intervaloSerpiente)
    intervaloSerpiente = setInterval(()=>{
    moverSerpiente()
    }, velocidad)

    clearInterval(intervaloTiempo)
    intervaloTiempo = setInterval(() => {
        actualizarTiempo()
    }, 1000)
}

function pausarJuego(){
    clearInterval(intervaloSerpiente)
    clearInterval(intervaloTiempo)

    document.getElementById("estado").innerText = "Pausado"

    dibujarTodo()
}

window.addEventListener("keydown",(event)=>{
    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
        event.preventDefault();
    }
    switch(event.key){
        case "ArrowRight": 
            cambiarDireccion("derecha") 
            break
        case "ArrowLeft":  
            cambiarDireccion("izquierda") 
            break
        case "ArrowUp":    
            cambiarDireccion("arriba") 
            break
        case "ArrowDown":  
            cambiarDireccion("abajo") 
            break
    }
})