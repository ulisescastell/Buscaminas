
function init() {
    let tablero = new Tablero(5, 5, 5)
    document.oncontextmenu = function () { return false }
    tablero.colocaBombas()
    tablero.calcularAdyacentes()
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
            casillaDiv.addEventListener('click', function (revelar) {
                tablero.tablero[i][j].revelar();
                if (tablero.tablero[i][j].esBomba) {
                    casillaDiv.classList.add('mina');
                }
                else {
                    console.log(tablero.tablero[i][j])
                    switch (tablero.tablero[i][j].adyacentes) {
                        case 1:
                            casillaDiv.classList.add('uno')
                            break;
                        case 2:
                            casillaDiv.classList.add('dos')
                            break;
                        case 3:
                            casillaDiv.classList.add('tres')
                            break;
                        case 4:
                            casillaDiv.classList.add('cuatro')
                            break;
                        case 5:
                            casillaDiv.classList.add('cinco')
                            break;
                        default:
                            casillaDiv.classList.add('revelada')
                            break;
                    }
                }
            })
            casillaDiv.addEventListener('contextmenu', function (banderita) {
                casillaDiv.classList.add('flag')
            })
            fila.appendChild(casillaDiv)
        }
        container.appendChild(fila)
    }
    document.body.appendChild(container)
}

function perder(tablero) {
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.tablero[i][j].esBomba) {
                alert("Has perdido!")
            }
        }
    }
}

function crearTableroMedida(numero, bombas = 10) {
    container = document.getElementById("tablero");
    container.innerHTML = ''
    bombas = numero + numero * 0.3
    let tablero = new Tablero(numero, numero, bombas);
    tablero.colocaBombas()
    tablero.calcularAdyacentes()
    crearTablero(tablero)
}








