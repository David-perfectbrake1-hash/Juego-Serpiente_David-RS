const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")
let serpiente = [{x: 10, y: 10}]
let intervaloSerpiente
let direccion = "derecha"
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