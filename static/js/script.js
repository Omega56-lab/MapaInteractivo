let modoEdicion = 'agregar'; // Puede ser 'agregar' o 'modificar'
// Inicializar el mapa de Google
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: -34.985269, lng: -71.239421 },
        styles: [
            {
                featureType: "transit.station.airport",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "landscape.natural",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit.station.rail",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit.station.bus",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        
        ]
    });

    fetch('/get_edificios')
        .then(response => response.json())
        .then(data => {
            agregarMarcadores(data);
        })
        .catch(error => console.error('Error:', error));


    const infoBox = document.getElementById("info-box");

    // Función para crear los marcadores
    function agregarMarcadores(edificios) {
        edificios.forEach(edificio => {
            const marker = new google.maps.Marker({
                position: { lat: parseFloat(edificio.latitud), lng: parseFloat(edificio.longitud) },
                map: map,
                title: edificio.nombre,
            });

            marker.addListener('click', function () {
                infoBox.innerHTML = `
                <button id="close-info-box" class="close-button">X</button>
                <h3>${edificio.nombre}</h3>
                <p>Accesibilidad: ${edificio.accesibilidad}</p>
                <button id="delete-marker" data-id="${edificio.id_edificios}" class="delete-button">Eliminar</button>
                <button id="edit-marker" data-id="${edificio.id_edificios}" class="edit-button">Modificar</button>
            `;
                infoBox.style.display = 'block';

                const closeButton = document.getElementById("close-info-box");
                closeButton.addEventListener('click', () => {
                    infoBox.style.display = 'none';
                });

                const deleteButton = document.getElementById("delete-marker");
                deleteButton.addEventListener('click', () => {
                eliminarEdificio(edificio.id_edificios);
                });

                const editButton = document.getElementById("edit-marker");
                editButton.addEventListener('click', () => {
                mostrarFormularioEdicion(edificio);
                });
                
            });
        });
    }
    
    function mostrarFormularioEdicion(edificio) {
        limpiarFormulario();  // Limpia el formulario para evitar conflictos
    
        modoEdicion = 'modificar';
        document.getElementById("submit-button").textContent = "Modificar";
        document.querySelector(".modal-content h1").textContent = "Modificar Marcador";
    
        document.getElementById("nombre").value = edificio.nombre;
        document.getElementById("direccion").value = edificio.direccion;
        document.getElementById("latitud").value = edificio.latitud;
        document.getElementById("longitud").value = edificio.longitud;
    
        // Marca los checkboxes correspondientes
        const opciones = document.querySelectorAll("#tipo-accesibilidad-container input[type='checkbox']");
        opciones.forEach(checkbox => {
            checkbox.checked = edificio.accesibilidad.includes(checkbox.name);
        });
    
        // Cargar tipos de accesibilidad para asegurar que el formulario tenga la información correcta
        cargarTiposAccesibilidad();
    
        document.getElementById("form-modal").setAttribute("data-id", edificio.id_edificios);
        document.getElementById("form-modal").style.display = 'block';
    }
    
    

    function eliminarEdificio(id) {
        fetch(`/delete_edificio/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Edificio eliminado exitosamente");
                location.reload(); // Recargar para actualizar el mapa
            } else {
                alert("Error al eliminar el edificio");
            }
        })
        .catch(error => console.error('Error:', error));
    }

    document.getElementById("agregar-marcador").addEventListener("click", function () {
        limpiarFormulario();  // Limpia antes de abrir el modal
        cargarTiposAccesibilidad();  // Asegura que los checkboxes se cargan
    
        modoEdicion = 'agregar';
        document.getElementById("submit-button").textContent = "Agregar";
        document.querySelector(".modal-content h1").textContent = "Agregar Marcador";
    
        const latLng = map.getCenter();
        document.getElementById("latitud").value = latLng.lat().toFixed(6);
        document.getElementById("longitud").value = latLng.lng().toFixed(6);
    
        document.getElementById("form-modal").style.display = 'block';
    });
    
    function modificarEdificio() {
        const id = document.getElementById("form-modal").getAttribute("data-id"); // Obtén el ID del edificio
        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
        const latitud = document.getElementById("latitud").value;
        const longitud = document.getElementById("longitud").value;
        const tipo_accesibilidad = Array.from(document.getElementById("tipo-accesibilidad").selectedOptions).map(option => option.value); // Obteniendo accesibilidad seleccionada
        
        fetch(`/edit_edificio/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nombre,
                direccion: direccion,
                latitud: latitud,
                longitud: longitud,
                tipo_accesibilidad: tipo_accesibilidad,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Edificio actualizado con éxito');
                // Aquí puedes agregar código para actualizar la vista o cerrar el modal
                location.reload(); // Recarga la página para reflejar los cambios
            } else {
                alert('Error al actualizar el edificio: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la actualización del edificio');
        });
    }
    
    // Cerrar el modal
    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("form-modal").style.display = 'none';
    });

    document.getElementById("add-building-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto
    
        const edificioId = document.getElementById("form-modal").getAttribute("data-id");
    
        if (modoEdicion === 'agregar') {
            // Lógica para agregar un nuevo edificio
            agregarEdificio(nombre, direccion, latitud, longitud, tipoAccesibilidad);
        } else if (modoEdicion === 'modificar') {
            // Lógica para modificar el edificio
            modificarEdificio(); // Asegúrate de que esta llamada esté aquí
        }
    
        limpiarFormulario(); // Limpia el formulario después de la acción
        document.getElementById("form-modal").style.display = 'none'; // Cierra el modal
    });
    

    document.getElementById("add-building-form").addEventListener("submit", function (event) {
        event.preventDefault();
    
        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
        const latitud = parseFloat(document.getElementById("latitud").value);
        const longitud = parseFloat(document.getElementById("longitud").value);
        const tipoAccesibilidad = Array.from(document.querySelectorAll("#tipo-accesibilidad-container input[type='checkbox']:checked")).map(checkbox => checkbox.value);
    
        const edificioId = document.getElementById("form-modal").getAttribute("data-id");
        const endpoint = edificioId ? `/edit_edificio/${edificioId}` : '/add_edificio';
    
        fetch(endpoint, {
            method: edificioId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, direccion, latitud, longitud, tipo_accesibilidad: tipoAccesibilidad })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Edificio guardado exitosamente");
                document.getElementById("form-modal").style.display = 'none';
                document.getElementById("add-building-form").reset();
                location.reload();
            } else {
                alert("Error al guardar el edificio");
            }
        })
        .catch(error => console.error('Error:', error));
    });
    
    

    // Enviar el formulario
    document.getElementById("add-building-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    const edificioId = document.getElementById("form-modal").getAttribute("data-id");
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const latitud = parseFloat(document.getElementById("latitud").value);
    const longitud = parseFloat(document.getElementById("longitud").value);
    const tipoAccesibilidad = Array.from(document.querySelectorAll("#tipo-accesibilidad-container input[type='checkbox']:checked")).map(checkbox => checkbox.value);
    
    if (modoEdicion === 'agregar') {
        agregarEdificio(nombre, direccion, latitud, longitud, tipoAccesibilidad);
    } else if (modoEdicion === 'modificar') {
        modificarEdificio(); // Asegúrate de que esta llamada esté aquí
    }

    limpiarFormulario(); // Limpia el formulario después de la acción
    document.getElementById("form-modal").style.display = 'none'; // Cierra el modal
});

    document.getElementById("latitud").addEventListener("input", function () {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9);
        }
    });
    
    document.getElementById("longitud").addEventListener("input", function () {
        if (this.value.length > 9) {
            this.value = this.value.slice(0, 9);
        }
    });

    function cargarTiposAccesibilidad() {
        fetch('/get_tipos_accesibilidad')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("tipo-accesibilidad-container");
            // Limpiar las opciones existentes
            container.innerHTML = ''; 
            const existingOptions = new Set(); // Para controlar duplicados
    
            data.forEach(tipo => {
                if (!existingOptions.has(tipo.nombre)) {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.value = tipo.id_tipos;
                    checkbox.id = `tipo-accesibilidad-${tipo.id_tipos}`;
                    checkbox.name = "tipo-accesibilidad";
                    
                    const label = document.createElement("label");
                    label.htmlFor = `tipo-accesibilidad-${tipo.id_tipos}`;
                    label.textContent = tipo.nombre;
                    
                    const div = document.createElement("div");
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    
                    container.appendChild(div);
                    existingOptions.add(tipo.nombre);
                }
            });
        })
        .catch(error => console.error('Error al cargar tipos de accesibilidad:', error));
    }
    

    
    function limpiarFormulario() {
        document.getElementById("add-building-form").reset();
        document.getElementById("submit-button").textContent = "Agregar";
        modoEdicion = 'agregar'; // Restablece el modo
        document.getElementById("form-modal").removeAttribute("data-id"); // Elimina el ID del edificio
    }

    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("form-modal").style.display = 'none';
        limpiarFormulario(); // Llama a la función para limpiar el formulario
    });
    

}

