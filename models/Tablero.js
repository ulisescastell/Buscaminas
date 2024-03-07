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





}

