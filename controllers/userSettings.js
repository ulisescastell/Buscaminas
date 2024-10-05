document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('configuracionJuego');
    if (form) {
        form.addEventListener('submit', manejarEnvioFormulario);
    }
});

function manejarEnvioFormulario(event) {
    event.preventDefault();
    guardarConfiguracion(this);
    window.location.href = 'juego.html';
}

function guardarConfiguracion(form) {
    localStorage.setItem('configuracionBuscaminas', JSON.stringify({
        nombre: form.nombre.value,
        filas: form.filas.value,
        columnas: form.columnas.value,
        bombas: form.bombas.value
    }));
}
