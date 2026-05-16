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
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(x,0)
        ctx.lineTo(x,canvas.height)
        ctx.stroke()
    }
}

function dibujarLineasHorizontales(){
    for(let y = 0; y <= canvas.height; y+= TAMANIO_CELDA){
        ctx.strokeStyle = "white"
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

    let numeroCelda = 0
    for(let y=0; y <= canvas.height; y+= TAMANIO_CELDA){
        ctx.fillText(numeroCelda, (TAMANIO_CELDA/2), y + (TAMANIO_CELDA/2) )
        numeroCelda++
    }
}

function dibujarNumerosEnX(){
    ctx.fillStyle="white"
    ctx.font="12px Arial"
    ctx.textAlign = "center"
    
    let numeroCelda = 0
    for(let x=0; x <= canvas.width; x+= TAMANIO_CELDA){
        ctx.fillText(numeroCelda, x + (TAMANIO_CELDA/2), (TAMANIO_CELDA/2) )
        numeroCelda++
    }
}

function dibujarTodo(){
    limpiarCanvas()
    dibujarTablero()
    dibujarSerpiente()
    dibujarComida()
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
    if (direccion === "derecha" && nuevaDireccion === "izquierda") return;
    if (direccion === "izquierda" && nuevaDireccion === "derecha") return;
    if (direccion === "arriba" && nuevaDireccion === "abajo") return;
    if (direccion === "abajo" && nuevaDireccion === "arriba") return;
    direccion = nuevaDireccion;
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

    // Aumentar la velocidad (reduciendo el tiempo)
    if(puntaje % 2 === 0){
        velocidad -= 50 
        iniciarJuego()
    }
}

function gameOver(){
    document.getElementById("estado").innerText = "Game Over"
    juegoTerminado = true // Cambia el estado para detener movimientos futuros
    clearInterval(intervaloSerpiente)
}

function reiniciarJuego(){
    clearInterval(intervaloSerpiente)
    
    serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
    direccion = "derecha"
    juegoTerminado = false
    puntaje = 0
    velocidad = 300

    document.getElementById("puntaje").innerText = 0
    document.getElementById("estado").innerText = "Listo"
    
    regenerarComida()
    dibujarTodo()
}

function iniciarJuego(){
    document.getElementById("estado").innerText = "Jugando"
    clearInterval(intervaloSerpiente)
    intervaloSerpiente = setInterval(()=>{
    moverSerpiente()
    }, velocidad)
}

function pausarJuego(){
    clearInterval(intervaloSerpiente)
    document.getElementById("estado").innerText = "Pausado"
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