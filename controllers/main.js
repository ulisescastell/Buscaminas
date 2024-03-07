
function init() {
    let tablero = new Tablero(5, 5, 5)
    document.oncontextmenu = function() { return false }
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
    let container = document.getElementById('tablero');
    for (let i = 0; i < tablero.filas; i++) {
        let fila = document.createElement('div') 
        for (let j = 0; j < tablero.columnas; j++) {
            let casillaDiv = document.createElement('div')
            casillaDiv.classList.add('casilla')
            casillaDiv.addEventListener('click', function(revelar) {
                tablero.tablero[i][j].revelar();
                if (tablero.tablero[i][j].esBomba) {
                    casillaDiv.classList.add('mina');
                } else {
                    casillaDiv.classList.add('revelada')
                }
            })
            casillaDiv.addEventListener('contextmenu', function(banderita) {
                casillaDiv.classList.add('flag')
            })
            fila.appendChild(casillaDiv)
            console.log(fila)
        }
        container.appendChild(fila)
    }
    document.body.appendChild(container)
}

function crearTableroMedida(numero,bombas = 10) {
    container = document.getElementById("tablero");
    container.innerHTML = ''
    bombas = numero + numero * 0.3
    let tablero = new Tablero(numero, numero, bombas);
    tablero.colocaBombas()
    crearTablero(tablero)
}








