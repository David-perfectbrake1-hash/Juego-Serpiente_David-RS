const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")
function pintarCoordenada(x,y,color){
    let pixelX = x*TAMANIO_CELDA
    let pixelY = y*TAMANIO_CELDA
    ctx.fillStyle=color
    ctx.fillRect(pixelX,pixelY,TAMANIO_CELDA,TAMANIO_CELDA)
}
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
}
const serpiente = [{x: 10, y: 10}]
function dibujarSerpiente(){
    const cabeza = serpiente[0]
    pintarCoordenada(cabeza.x,cabeza.y,"red")
}
function dibujarTodo(){
    limpiarCanvas()
    dibujarSerpiente()
}