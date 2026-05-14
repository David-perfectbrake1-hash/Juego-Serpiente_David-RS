const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")

let serpiente = [{x: 10, y: 10},{x: 9, y: 10}]
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

function moverSerpiente(){
    if(juegoTerminado) return
    let nuevaCabeza = {
        x: serpiente[0].x,
        y: serpiente[0].y
    }
    switch(direccion){
        case "derecha":
            nuevaCabeza.x++
            break
        case "izquierda":
            nuevaCabeza.x--
            break
        case "arriba":
            nuevaCabeza.y--
            break
        case "abajo":
            nuevaCabeza.y++
            break
    }
    if(
        nuevaCabeza.x < 0 || nuevaCabeza.x >= (canvas.width / TAMANIO_CELDA)
        ||
        nuevaCabeza.y < 0 || nuevaCabeza.y >= (canvas.height / TAMANIO_CELDA)
    ){
        gameOver()
        return
    }
    serpiente.unshift(nuevaCabeza)
    let atrapada = comidaAtrapada()
        if(atrapada){
            regenerarComida()
            aumentarPuntaje()
        } else {
            serpiente.pop()
        }
}

window.addEventListener("keydown",(event)=>{
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
    switch(event.key){
        case "ArrowRight":
            direccion = "derecha"
            break
        case "ArrowLeft":
            direccion = "izquierda"
            break
        case "ArrowUp":
            direccion = "arriba"
            break
        case "ArrowDown":
            direccion = "abajo"
            break
    }
})

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

intervaloSerpiente = setInterval(()=>{
    moverSerpiente()
    dibujarTodo()
}, 300)