
function init() {
    let tablero = new Tablero(10, 10, 10);
    propiedadesTablero()
    console.log(tablero)
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
    container.innerHTML = '' //lo vaciamos, así si elegimos jugar de nuevo con otro tamaño no se sobreescribe ni hay posibles conflictos :))
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
            casillaDiv.addEventListener('auxclick', function(banderita) {
                casillaDiv.classList.add('flag')
            })
            fila.appendChild(casillaDiv)
        }
        container.appendChild(fila)
    }
}


function propiedadesTablero() {
    let tablero
    let btn10 = document.querySelector('#btn10')
    let btn20 = document.querySelector('#btn20')
    let btn30 = document.querySelector('#btn30')

    btn10.addEventListener('click', function() {
        tablero = new Tablero(10, 10, 10)  
    })

    btn20.addEventListener('click', function() {
        new Tablero(20, 20, 20)
    })

    btn30.addEventListener('click', function() {
        new Tablero(0, 30, 30)
    }) 
}








