
function init() {
    let tablero = new Tablero(10, 10, 10);
    console.log(tablero)
    tablero.colocaBombas()
    crearTablero(tablero)

}

function añadirDom(id, contenido) {
    const container = document.getElementById(id)
    let p = document.createElement('p');
    p.textContent = contenido;
    container.appendChild(p);

}

function crearTablero(tablero) {
    let container = document.getElementById('tablero')
    for (i = 0; i < tablero.filas; i++) {
        let fila = document.createElement('div')
        fila.classList.add('casilla')
        container.appendChild(fila)
        for (j = 0; j < tablero.columnas; j++) {
            let columna = document.createElement('div')
            columna.classList.add('casilla')
            container.appendChild(columna)

        }
    }
    
}








