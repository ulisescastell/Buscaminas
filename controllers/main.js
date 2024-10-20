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
        nombreJugadorElemento.textContent = `Let's play, ${nombre}!`;
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

    if(tablero.tablero[x][y].marcada) {
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
    if (tablero.estado == true) {
        perder()
    }
    ganar()
}

function marcarCasilla(x, y, casillaDiv) {
    tablero.tablero[x][y].marcada = !tablero.tablero[x][y].marcada;
    if(tablero.tablero[x][y].marcada) {
        casillaDiv.classList.add('flag');
    } else {
        casillaDiv.classList.remove('flag');
    }
}

function revelarCasilla(x, y, casillaDiv) {
    casillaDiv.classList.add('revelada'); 
    if (tablero.tablero[x][y].esBomba) {
        casillaDiv.classList.remove('flag')
        casillaDiv.classList.add('mina');
        tablero.estado = true
    } else {
        let adyacentes = tablero.tablero[x][y].adyacentes;
        if (adyacentes > 0) {
            casillaDiv.classList.add(['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'][adyacentes-1]);
        }
    }
}

function ganar() {
    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            if (!tablero.tablero[i][j].revelada && !tablero.tablero[i][j].esBomba) {
                return;
            }
            if (!tablero.tablero[i][j].revelada && tablero.tablero[i][j].marcada && !tablero.tablero[i][j].esBomba) {
                return;
            }
        }
    }

    let posicionesDeBombas = tablero.obtenerPosicionesDeBombas();
    posicionesDeBombas.forEach(pos => {
        let casilla = document.querySelector(`div[coordx="${pos.x}"][coordy="${pos.y}"]`);
        if (casilla && !casilla.classList.contains('mina')) {
            casilla.classList.add('minaNormal'); 
        }
    });

    let tableroElemento = document.getElementById("tablero");
    tableroElemento.style.pointerEvents = "none";
    crearBoton("GG, you won!!!");
    confetti();
    confetti();
    confetti();
    confetti();
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
        tablero.tablero[x][y].marcada = !tablero.tablero[x][y].marcada;
        if(tablero.tablero[x][y].marcada) {
            this.classList.add('flag');
        } else {
            this.classList.remove('flag');
        }
    });
}

function perder() {
    let posicionesDeBombas = tablero.obtenerPosicionesDeBombas();
    posicionesDeBombas.forEach(pos => {
        let casilla = document.querySelector(`div[coordx="${pos.x}"][coordy="${pos.y}"]`);
        if (casilla) {
            casilla.classList.add('revelada');
            casilla.classList.remove('flag');
            if (tablero.tablero[pos.x][pos.y].revelada) {
                casilla.classList.add('mina'); 
            } else {
                casilla.classList.add('minaNormal'); 
            }
        }
    });

    for (let i = 0; i < tablero.filas; i++) {
        for (let j = 0; j < tablero.columnas; j++) {
            let casillaDiv = document.querySelector(`div[coordx="${i}"][coordy="${j}"]`);
            if (casillaDiv && tablero.tablero[i][j].marcada && !tablero.tablero[i][j].esBomba) {
                casillaDiv.classList.add('revelada');
                casillaDiv.classList.remove('flag');
            }
        }
    }

    let tableroElemento = document.getElementById("tablero");
    tableroElemento.style.pointerEvents = "none";
    crearBoton("You missed out some bombs... Next time!");
}



function crearBoton(mensaje) {
    let content = document.getElementById("contenido")
    let container = document.createElement("div")
    container.className = 'container'
    let btn = document.createElement("button")
    let p = document.createElement("p")
    btn.addEventListener('click', function(){
        location.reload()
    })
    btn.textContent = "Play again"
    p.textContent = mensaje
    content.appendChild(container)
    container.appendChild(p)
    container.appendChild(btn)
}











