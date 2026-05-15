const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")

let serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
let intervaloSerpiente
let direccion = "derecha"
let comida = {x: 5,y: 5}
let puntaje = 0
let juegoTerminado = false


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
}

function moverIzquierda(){
    let nuevaCabeza = {
        x: serpiente[0].x-1,
        y:serpiente[0].y
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
}

function moverArriba(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y-1
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
}

function moverAbajo(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y+1
    }
//unshift: Agrega un nuevo elemento al inicio del arreglo
    serpiente.unshift(nuevaCabeza)
}

function cambiarDireccion(direccionRecibida) {
  direccion=direccionRecibida
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
 
    //Quitamos uno para compensar el unshift del switch
        serpiente.pop()//Elimina el último elemento del arreglo.
    // PARTE 10.b: Para que crezca usando push
        let cola = serpiente[serpiente.length -1 ]
        let nuevoSegmento = {x: cola.x, y: cola.y}
        serpiente.push(nuevoSegmento)
    }else{
    //Elimina el último elemento del arreglo.
        serpiente.pop()
    }

    let nuevaCabeza = serpiente[0]
    if(
        nuevaCabeza.x < 0 || nuevaCabeza.x >= (canvas.width / TAMANIO_CELDA)
        ||
        nuevaCabeza.y < 0 || nuevaCabeza.y >= (canvas.height / TAMANIO_CELDA)
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
}

function gameOver(){
    document.getElementById("estado").innerText = "Game Over"
    juegoTerminado = true
}

function reiniciarJuego(){
    clearInterval(intervaloSerpiente)
    
    serpiente = [{x: 10, y: 10},{x: 9, y: 10}, {x: 8, y: 10}]
    direccion = "derecha"
    juegoTerminado = false
    puntaje = 0

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
    }, 300)
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