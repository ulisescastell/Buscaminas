var tablero 
function init() {
    tablero = new Tablero(10, 10, 20)
    document.oncontextmenu = function () { return false }
    tablero.colocaBombas()
    tablero.calcularAdyacentes()
    crearTablero()
}

function crearTablero() {
    let container = document.getElementById('tablero');
    container.innerHTML = "";
    for (let i = 0; i < tablero.filas; i++) {
        let fila = document.createElement('div');
        for (let j = 0; j < tablero.columnas; j++) {
            let casillaDiv = document.createElement('div');
            casillaDiv.setAttribute("coordx", i);
            casillaDiv.setAttribute("coordy", j);
            casillaDiv.classList.add('casilla'); 

            casillaDiv.addEventListener('click', clickCasilla);
            casillaDiv.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                casillaDiv.classList.toggle('flag');
            });
            
            if(tablero.tablero[i][j].revelada) {
                casillaDiv.classList.add('revelada'); 
                if (tablero.tablero[i][j].esBomba) {
                    casillaDiv.classList.add('mina'); 
                } else {
                    let adyacentes = tablero.tablero[i][j].adyacentes;
                    if (adyacentes > 0) {
                        casillaDiv.classList.add(['uno', 'dos', 'tres', 'cuatro', 'cinco'][adyacentes - 1]); // Clase según el número de bombas adyacentes
                    }
                }
            }

            fila.appendChild(casillaDiv);
        }
        container.appendChild(fila);
    }
}

function clickCasilla() {
    tablero.abrirTablero(this.getAttribute("coordx"), this.getAttribute("coordy"))
    crearTablero();
}

function crearTableroMedida(numero, bombas = 10) {
    container = document.getElementById("tablero");
    container.innerHTML = ''
    bombas = numero + numero * 0.3
    let tableroCrear = document.getElementById("tablero")
    tableroCrear.style.pointerEvents = "auto";
    let tablero = new Tablero(numero, numero, bombas);
    tablero.colocaBombas()
    tablero.calcularAdyacentes()
    crearTablero(tablero)
}

function perder() {
    const tablero = document.getElementById("tablero")
    tablero.style.pointerEvents = "none";
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (tablero.tablero[i][j].esBomba) {
                console.log("hola")
            }
        }
    }
}









