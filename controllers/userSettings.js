document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('configuracionJuego');
    if (form) {
        form.addEventListener('submit', manejarEnvioFormulario);
    }
});


function manejarEnvioFormulario(event) {
    event.preventDefault();
    if(validarFormulario(this)) {
        guardarConfiguracion(this);
        window.location.href = 'juego.html';
    }
}

function validarFormulario(form) {
    const fechaNacimiento = new Date(form.fechaNacimiento.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 18) {
        alert('Debes ser mayor de edad.');
        return false;
    }
    return true;
}

function guardarConfiguracion(form) {
    localStorage.setItem('configuracionBuscaminas', JSON.stringify({
        nombre: form.nombre.value,
        filas: form.filas.value,
        columnas: form.columnas.value,
        bombas: form.bombas.value
    }));
}
