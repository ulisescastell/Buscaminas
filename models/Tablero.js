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
                    this.obtenerAdyacentes(casilla)
                    casilla.adyacentes += 1 //sumar alrededor     
                }
                else {
                    //console.log("no calcular")
                }

            }
        }
    }

    obtenerAdyacentes(casillaOrigen) {
        const columa = casillaOrigen.y
        const fila = casillaOrigen.x
          
        let casillasAlrededor = []
        for (let x = fila-1; x < fila+1; x++) {
            for (let y = columa-1; y < columa+1; y++) {
                let casilla = this.tablero[x][y]
                casillasAlrededor.push(casilla)
            }
        }
        console.log(casillasAlrededor)
    }







}

