const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")
let serpiente = [{x: 10, y: 10}]
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
    const cabeza = serpiente[0]
    pintarCoordenada(cabeza.x,cabeza.y,"red")
}
function dibujarTodo(){
    limpiarCanvas()
    dibujarSerpiente()
}
function moverDerecha(){
    const nuevaCabeza = {
        x: serpiente[0].x+1,
        y: serpiente[0].y
    }
        serpiente = [nuevaCabeza]
}