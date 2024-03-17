let tablero 

function init() {
     let configuracionGuardada = JSON.parse(localStorage.getItem('configuracionBuscaminas'));
    
     if (configuracionGuardada) {
        mostrarNombreJugador(configuracionGuardada.nombre);
         tablero = new Tablero(
             parseInt(configuracionGuardada.filas),
             parseInt(configuracionGuardada.columnas),
             parseInt(configuracionGuardada.bombas)
         );
     } else {
         window.location.href = 'index.html'; 
     }
     tablero.colocaBombas();
     tablero.calcularAdyacentes();
     crearTablero(); 
}

function mostrarNombreJugador(nombre) {
    const nombreJugadorElemento = document.getElementById('nombre-jugador');
    if (nombreJugadorElemento) {
        nombreJugadorElemento.textContent = `Bienvenido/a, ${nombre}`;
    }
}

function crearCasilla(x, y) {
    let casillaDiv = document.createElement('div');
    casillaDiv.setAttribute("coordx", x);
    casillaDiv.setAttribute("coordy", y);
    casillaDiv.classList.add('casilla'); 

    casillaDiv.addEventListener('click', clickCasilla);
    casillaDiv.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        marcarCasilla(x, y, casillaDiv);
    });

    if(tablero.tablero[x][y].marcadaConBandera) {
        casillaDiv.classList.add('flag');
    }

    if(tablero.tablero[x][y].revelada) {
        revelarCasilla(x, y, casillaDiv);
    }

    return casillaDiv;
}

function crearTablero() {
    let container = document.getElementById('tablero');
    container.innerHTML = "";
    for (let i = 0; i < tablero.filas; i++) {
        let fila = document.createElement('div');
        for (let j = 0; j < tablero.columnas; j++) {
            let casillaDiv = crearCasilla(i, j);
            fila.appendChild(casillaDiv);
        }
        container.appendChild(fila);
    }
}

function marcarCasilla(x, y, casillaDiv) {
    tablero.tablero[x][y].marcadaConBandera = !tablero.tablero[x][y].marcadaConBandera;
    if(tablero.tablero[x][y].marcadaConBandera) {
        casillaDiv.classList.add('flag');
    } else {
        casillaDiv.classList.remove('flag');
    }
}

function revelarCasilla(x, y, casillaDiv) {
    casillaDiv.classList.add('revelada'); 
    if (tablero.tablero[x][y].esBomba) {
        casillaDiv.classList.add('mina');
        perder();
    } else {
        let adyacentes = tablero.tablero[x][y].adyacentes;
        if (adyacentes > 0) {
            casillaDiv.classList.add(['uno', 'dos', 'tres', 'cuatro', 'cinco'][adyacentes-1]);
        }
    }
}


function comprobacion(casilla) {
    if(tablero.tablero[i][j].marcadaConBandera) {
        casillaDiv.classList.add('flag');
    }
    if(tablero.tablero[i][j].revelada) {
        casillaDiv.classList.add('revelada'); 
        if (tablero.tablero[i][j].esBomba) {
            casillaDiv.classList.add('mina');
            perder()

        } else {
            let adyacentes = tablero.tablero[i][j].adyacentes;
            if (adyacentes > 0) {
                casillaDiv.classList.add(['uno', 'dos', 'tres', 'cuatro', 'cinco'][adyacentes-1]); 
            }
        }
    }
    fila.appendChild(casillaDiv);
}

function clickCasilla() {
    tablero.abrirTablero(this.getAttribute("coordx"), this.getAttribute("coordy"))
    crearTablero();
}

function banderita () {
    casillaDiv.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        let x = this.getAttribute("coordx");
        let y = this.getAttribute("coordy");
        tablero.tablero[x][y].marcadaConBandera = !tablero.tablero[x][y].marcadaConBandera;
        if(tablero.tablero[x][y].marcadaConBandera) {
            this.classList.add('flag');
        } else {
            this.classList.remove('flag');
        }
    });
}

function crearTableroMedida(filas, columnas, bombas) {
    container = document.getElementById("tablero");
    container.innerHTML = ''
    let tableroCrear = document.getElementById("tablero")
    tableroCrear.style.pointerEvents = "auto";
    let tablero = new Tablero(filas, columnas, bombas);
    tablero.colocaBombas()
    tablero.calcularAdyacentes()
    crearTablero(tablero)
}

function perder() {
    let posicionesDeBombas = tablero.obtenerPosicionesDeBombas();
    posicionesDeBombas.forEach(pos => {
        let casilla = document.querySelector(`div[coordx="${pos.x}"][coordy="${pos.y}"]`);
        if (casilla && !casilla.classList.contains('mina')) {
            casilla.classList.add('minaNormal');
        }
    });
    let tableroElemento = document.getElementById("tablero");
    tableroElemento.style.pointerEvents = "none";
}









