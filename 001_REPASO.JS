const TAMANIO_CELDA = 25
const canvas = document.getElementById("canvasJuego")
const ctx = canvas.getContext("2d")
function pintarCoordenada(x,y,color){
    let pixelX = x*TAMANIO_CELDA
    let pixelY = y*TAMANIO_CELDA
    ctx.fillStyle=color
    ctx.fillRect(pixelX,pixelY,TAMANIO_CELDA,TAMANIO_CELDA)
}