class Casilla {
    marcada;
    revelada;
    esBomba;
    adyacentes;
    x;
    y;

    constructor(x, y) {
        this.marcada = false
        this.revelada = false
        this.esBomba = false
        this.adyacentes = 0
        this.x = x
        this.y = y
    }


    toString() {
        return `La casilla es: ${this.x},${this.y} con bomba: ${this.esBomba} `
    }

}