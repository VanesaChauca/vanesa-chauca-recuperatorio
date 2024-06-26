'use strict';

/** CHAUCA TAPIA, VANESA */

let discos = [];
let contadorDiscos = 0;

// Llamada desde un boton. Pide los datos para cargar un disco. 

function cargarDisco() {
    let nombreDisco = prompt("Ingrese el nombre del disco:");
    while (!nombreDisco) {
        alert("El nombre del disco no puede estar vacío.");
        nombreDisco = prompt("Ingrese el nombre del disco:");
    }

    let autor = prompt("Ingrese el nombre del autor o banda:");
    while (!autor) {
        alert("El nombre del autor/banda no puede estar vacío.");
        autor = prompt("Ingrese el nombre del autor o banda:");
    }

    let codigo = prompt("Ingrese el código numérico único del disco entre 1 a 999:");
    codigo = parseInt(codigo);
    while (!codigo || codigo < 1 || codigo > 999 || discos.some(disco => disco.codigo === codigo)) {
        alert("El código debe ser único, numerico y estar entre 1 y 999.");
        codigo = parseInt(prompt("Ingrese el código numérico único del disco entre 1 a 999:"));
    }

    let disco = {
        nombre: nombreDisco,
        autor: autor,
        codigo: codigo,
        pistas: []
    };

    while (true) {
        let nombrePista = prompt("Ingrese el nombre de la pista:");
        while (!nombrePista) {
            alert("El nombre de la pista no puede estar vacío.");
            nombrePista = prompt("Ingrese el nombre de la pista:");
        }

        let duracion = prompt("Ingrese la duración de la pista en segundos (0-7200):");
        duracion = parseInt(duracion);
        while (duracion < 0 || duracion > 7200 || isNaN(duracion)) {
            alert("La duración debe estar entre 0 y 7200 segundos.");
            duracion = parseInt(prompt("Ingrese la duración de la pista en segundos (0-7200):"));
        }

        disco.pistas.push({ nombre: nombrePista, duracion: duracion });

        let continuar = confirm("¿Desea agregar otra pista?");
        if (!continuar) break;
    }

    discos.push(disco);
    contadorDiscos++;
    guardarEnLocalStorage();
    mostrarContador();
}

function mostrarContador(){
    const contador = document.getElementById('contadorDiscos');
    contador.value = `Discos cargados: ${contadorDiscos}`;
}

function convertirDuracion(duracion) {
    let horas = Math.floor(duracion / 3600);
    let minutos = Math.floor((duracion % 3600) / 60);
    let segundos = duracion % 3600 % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Llamada desde un boton. Muestra todos los discos disponibles.

function mostrarDisco() {
    const contenedorDiscos = document.getElementById('contenedorDiscos');
    contenedorDiscos.innerHTML = '';

    discos.forEach(disco => {
        let discoDiv = document.createElement('div');
        discoDiv.classList.add('disco');

        let cantidadPistas = disco.pistas.length;
        let duracionTotal = disco.pistas.reduce((total, pista) => total + pista.duracion, 0);
        let duracionPromedio = duracionTotal / cantidadPistas;
        let pistaMayorDuracion = disco.pistas.reduce((max, pista) => pista.duracion > max.duracion ? pista : max, disco.pistas[0]);
    

        let discoInfo = `
            <div class="portada">
                <p><span>#${disco.codigo} : ${disco.nombre} - ${disco.autor}</span></p>
                
            </div>
            <div class="contenidoPistas">
                <p class="detalleDiscos"><span class="detalle">Pistas:</span> ${cantidadPistas} | <span class="detalle">Duracion disco:</span> ${convertirDuracion(duracionTotal)} | <span class="detalle">Promedio duracion pistas:</span> ${convertirDuracion(duracionPromedio)} 
                | <br><span class="detalle">Pista con mayor duración:</span> ${pistaMayorDuracion.nombre} (${convertirDuracion(pistaMayorDuracion.duracion)})</p>
                <p class="contenido">Canciones:</p>
        `;

        disco.pistas.forEach(pista => {
            let minutos = Math.floor(pista.duracion / 60);
            let segundos = pista.duracion - minutos * 60;
            let duracionStr = `${minutos}:${segundos.toString().padStart(2, '0')}`;

            discoInfo += `<p class="canciones">- ${pista.nombre}: <span class="${pista.duracion > 180 ? 'duracion-larga' : ''}">${duracionStr}</span></p>`;
        });

        discoInfo += `</div><br>`;
        discoDiv.innerHTML = discoInfo;
        contenedorDiscos.appendChild(discoDiv);
    });
}

// Función para buscar y mostrar un disco por su código
function buscarDisco() {
    const inputCodigo = document.getElementById('inputCodigo');
    const codigoBuscado = parseInt(inputCodigo.value);

    const contenedorDiscos = document.getElementById('contenedorDiscos');
    contenedorDiscos.innerHTML = '';

    const discoEncontrado = discos.find(disco => disco.codigo === codigoBuscado);

    if (discoEncontrado) {
        let discoDiv = document.createElement('div');
        discoDiv.classList.add('disco');

        let cantidadPistas = discoEncontrado.pistas.length;
        let duracionTotal = discoEncontrado.pistas.reduce((total, pista) => total + pista.duracion, 0);
        let duracionPromedio = cantidadPistas > 0 ? duracionTotal / cantidadPistas : 0;
        let pistaMayorDuracion = discoEncontrado.pistas.reduce((max, pista) => pista.duracion > max.duracion ? pista : max, discoEncontrado.pistas[0]);

        let discoInfo = `
            <div class="portada">
                <p><span>#${discoEncontrado.codigo} : ${discoEncontrado.nombre} - ${discoEncontrado.autor}</span></p>
            </div>
            <div class="contenidoPistas">
                <p class="detalleDiscos">Pistas: ${cantidadPistas} | Duración total del disco: ${convertirDuracion(duracionTotal)} | Promedio duración pistas: ${convertirDuracion(duracionPromedio)} | Pista con mayor duración: ${pistaMayorDuracion.nombre} (${convertirDuracion(pistaMayorDuracion.duracion)})</p>
                <p class="contenido">Canciones:</p>
        `;

        discoEncontrado.pistas.forEach(pista => {
            let minutos = Math.floor(pista.duracion / 60);
            let segundos = pista.duracion - minutos * 60;
            let duracionStr = `${minutos}:${segundos.toString().padStart(2, '0')}`;

            discoInfo += `<p class="canciones">- ${pista.nombre}: <span class="${pista.duracion > 180 ? 'duracion-larga' : ''}">${duracionStr}</span></p>`;
        });

        discoInfo += `</div><br>`;
        discoDiv.innerHTML = discoInfo;
        contenedorDiscos.appendChild(discoDiv);
    } else {
        alert("No se encontro el disco con el codigo ingresado.");;
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem('discos', JSON.stringify(discos));
    localStorage.setItem('contadorDiscos', contadorDiscos.toString());
}

// Cargar discos desde localStorage
function cargarDesdeLocalStorage() {
    const discosGuardados = localStorage.getItem('discos');
    const contadorGuardado = localStorage.getItem('contadorDiscos');

    if (discosGuardados) {
        discos = JSON.parse(discosGuardados);
        contadorDiscos = parseInt(contadorGuardado, 10) || 0;
        mostrarContador();
        mostrarDisco();
    }
}
window.onload = cargarDesdeLocalStorage;

/// eliminar discos cargados 
function eliminarDiscos() {
    if (confirm("¿Está seguro que desea eliminar todos los discos?")) {
        discos = [];
        contadorDiscos = 0;
        localStorage.removeItem('discos');
        localStorage.removeItem('contadorDiscos');
        mostrarContador();
        mostrarDisco();
        alert("Todos los discos han sido eliminados.");
    }
}