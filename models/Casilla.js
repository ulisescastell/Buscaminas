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

    marcar() {
        if (!this.revelada) {
          this.marcada = !this.marcada;
        }
      }
      
    revelar() {
        if (!this.marcada) {
          this.revelada = true;
        }
    }
      
    colocarBomba() {
        this.esBomba = true;
    }

    toString() {
        return `La casilla es: ${this.x},${this.y} con bomba: ${this.esBomba}`
    }
}