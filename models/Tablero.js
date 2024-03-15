class Tablero {
    filas;
    columnas;
    numBombas;
    tablero;

    constructor(filas, columnas, numBombas) {
        this.filas = filas
        this.columnas = columnas
        this.numBombas = numBombas
        this.tablero = this.generarTablero();
    }

    generarTablero() {
        const tablero = []
        for (let i = 0; i < this.filas; i++) {
            const fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(new Casilla(i, j))
            }
            tablero.push(fila);
        }
        return tablero;
    }

    colocaBombas() {
        let bombasColocadas = 0
        let x = 0;
        let y = 0;
        while (bombasColocadas < this.numBombas) {
            do {
                x = parseInt(Math.random() * this.filas)
                y = parseInt(Math.random() * this.columnas)
            } while (this.tablero[x][y].esBomba == true)
            bombasColocadas++
            this.tablero[x][y].esBomba = true
        }
    }

    calcularAdyacentes() {
        for (let x = 0; x < this.columnas; x++) {
            for (let y = 0; y < this.filas; y++) {
                let casilla = this.tablero[x][y]
                if (casilla.esBomba) {
                    console.log(casilla)
                    let casillasAdyacentes = this.obtenerAdyacentes(casilla);
                    casillasAdyacentes.forEach(casilla => casilla.adyacentes++)
                }
            }
        }
    }

    obtenerAdyacentes(casillaOrigen) {
        const y = casillaOrigen.y
        const x = casillaOrigen.x

        let casillasAlrededor = []

        if (y > 0) {
            if (x > 0) {
                casillasAlrededor.push(this.tablero[x - 1][y - 1])
            }
            casillasAlrededor.push(this.tablero[x][y - 1])
            if (x < this.columnas - 1) {
                casillasAlrededor.push(this.tablero[x + 1][y - 1])
            }
        }
        if (x > 0) {
            casillasAlrededor.push(this.tablero[x - 1][y])
            if (x < this.filas - 1) {
                casillasAlrededor.push(this.tablero[x + 1][y])
            }
        }
        if (y < this.columnas - 1) {
            if (x > 0) {
                casillasAlrededor.push(this.tablero[x - 1][y + 1])
            }
            casillasAlrededor.push(this.tablero[x][y + 1])
            if (x < this.columnas - 1) {
                casillasAlrededor.push(this.tablero[x + 1][y + 1])
            }
        }
        return casillasAlrededor
    }

    abrirTablero(x, y) {
        x = parseInt(x);
        y = parseInt(y);
        
        if (this.tablero[x][y].esBomba) {
            this.tablero[x][y].revelar()
            return -1;
        }
        if (this.tablero[x][y].adyacentes != 0) {
            this.tablero[x][y].revelar();
            return;
        } else {
            this.tablero[x][y].revelar();
            let vecinos = this.obtenerAdyacentes(this.tablero[x][y]);
            vecinos.forEach(vecino => {
                if (!vecino.revelada) {
                    this.abrirTablero(vecino.x, vecino.y);
                }
            });
        }
    }




}

