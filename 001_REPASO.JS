const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")
let serpiente = [{x: 10, y: 10}]
let intervaloSerpiente
let direccion = "derecha"
let comida = {x: 5,y: 5}
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
function dibujarTodo(){
    limpiarCanvas()
    dibujarSerpiente()
    dibujarComida()
}
function moverDerecha(){
    let nuevaCabeza = {
        x: serpiente[0].x+1,
        y:serpiente[0].y
    }
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()
}
function moverIzquierda(){
    let nuevaCabeza = {
        x: serpiente[0].x-1,
        y:serpiente[0].y
    }
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()
}
function moverArriba(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y-1
    }
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()
}
function moverAbajo(){
    let nuevaCabeza = {
        x: serpiente[0].x,
        y:serpiente[0].y+1
    }
    serpiente.unshift(nuevaCabeza)
    serpiente.pop()
}
intervaloSerpiente = setInterval(()=>{
    moverSerpiente()
    dibujarTodo()
}, 300)
function moverSerpiente(){
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
    serpiente.unshift(nuevaCabeza)
    if(!comidaAtrapada()){
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