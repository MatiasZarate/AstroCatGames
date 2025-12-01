window.addEventListener("load", function(){ 
    // Variables de Contenedores y Selectores
    const selectorForm = document.getElementById('selector_tarjetas');
    const formularios = document.querySelectorAll('.formulario_tarjeta');
    const metodoPagoContainer = document.getElementById('metodoPago');
    const tituloTonto = document.getElementById('tituloTonto');
    const envioContainer = document.getElementById('envio');

    // Referencias a los formularios
    let formularioMC = document.getElementById("formularioMC");
    let formularioVS = document.getElementById("formularioVS");
    let formularioMP = document.getElementById("formularioMP");

    // --- Funciones Reutilizables ---
    
    // Función para manejar la transición (Ocultar Pago, Mostrar Envío)
    function handleSuccessfulSubmission() {
        // Limpiar errores visibles antes de la transición
        document.querySelector("div.errores3 ul").innerHTML = " ";
        

        metodoPagoContainer.style.display = 'none';
        tituloTonto.style.display = 'none';
        envioContainer.style.display = 'block';
    }

    // Función para mostrar errores en el contenedor 'errores2'
    function displayErrors(errores) {
        let ulErrores = document.querySelector("div.errores3 ul");
        ulErrores.innerHTML = " ";
        errores.forEach(error => {
            ulErrores.innerHTML += `<li>${error}</li>`;
        });
    }

    // --- Lógica de Cambio de Tarjeta ---
    if(selectorForm){
        selectorForm.addEventListener('change', (event) => {
            if(event.target.name === 'pago') {
                const formSeleccionado = event.target.value; 

document.querySelector("div.errores3 ul").innerHTML = " ";

                formularios.forEach(form => {
                    form.style.display = 'none';
                });

                let idToShow;
                if (formSeleccionado === 'mp') {
                    idToShow = 'mp'; 
                  } else {
                    idToShow = `formulario-${formSeleccionado}`; 
                } 
                const formularioMostrar = document.getElementById(idToShow);
         
                if(formularioMostrar){
                    formularioMostrar.style.display = 'block';
                }
            }
        });
    }

    /* logica cambio de forma de envio */
    // 1. Obtener referencias a los elementos clave del envío
    const selectorEnvio = document.getElementById('selector_envio');
    const formularioDomicilio = document.getElementById('formulario_domicilio');
    const direccionLocal = document.getElementById('direccion_local');

    // 2. Manejador de eventos para el cambio de opción
    if (selectorEnvio) {
        selectorEnvio.addEventListener('change', (event) => {
            if (event.target.name === 'envio') {
                const tipoEnvio = event.target.value;

                if (tipoEnvio === 'domicilio') {
                    // Mostrar formulario de domicilio, ocultar dirección del local
                    formularioDomicilio.style.display = 'block';
                    direccionLocal.style.display = 'none';
                } else if (tipoEnvio === 'local') {
                    // Ocultar formulario de domicilio, mostrar dirección del local
                    formularioDomicilio.style.display = 'none';
                    direccionLocal.style.display = 'block';
                }
            }
        });

        // 3. Establecer el estado inicial al cargar la página (Envío a domicilio es checked)
        // Ya que 'domicilio' está marcado por defecto en el HTML, aseguramos que su formulario sea visible.
        formularioDomicilio.style.display = 'block';
        direccionLocal.style.display = 'none';
    }


    // --- Validaciones de Formularios de Pago ---

    // 1. Master Card (MC)
    formularioMC.addEventListener("submit", function(e){
        e.preventDefault(); // Detener el envío por defecto SIEMPRE
        let errores = [];

        let nombre = document.getElementById("nombre");
        if(nombre.value === "" || nombre.value.length < 4 ){
            errores.push("El nombre no puede estar vacío y debe tener al menos 4 caracteres.");
        }
        let numeroTar = document.getElementById("numeroTar");
        if(numeroTar.value === "" || numeroTar.value.length !== 16 ){
            errores.push("El número de tarjeta no puede estar vacío y debe ser de 16 caracteres.");
        }
        let caducidad = document.getElementById("caducidad");
        if(caducidad.value === ""){
            errores.push("El campo de fecha de caducidad no puede estar vacío.");
        }
        let seguridad = document.getElementById("seguridad");
        if(seguridad.value === "" || seguridad.value.length !== 3 ){
            errores.push("El código de seguridad no puede estar vacío y debe ser de 3 caracteres.");
        }
        
        if(errores.length > 0){
            displayErrors(errores);
        } else {
            // Éxito: Limpia errores y haz la transición
            handleSuccessfulSubmission();
        }
    });
    
    // 2. Visa (VS)
    formularioVS.addEventListener("submit", function(e){
        e.preventDefault(); // Detener el envío por defecto SIEMPRE
        let errores = [];

        let nombre = document.getElementById("nombre2");
        if(nombre.value === "" || nombre.value.length < 4 ){
            errores.push("El nombre no puede estar vacío y debe tener al menos 4 caracteres.");
        }
        let numeroTar = document.getElementById("numeroTar2");
        if(numeroTar.value === "" || numeroTar.value.length !== 16 ){
            errores.push("El número de tarjeta no puede estar vacío y debe ser de 16 caracteres.");
        }
        let caducidad = document.getElementById("caducidad2");
        if(caducidad.value === ""){
            errores.push("El campo de fecha de caducidad no puede estar vacío.");
        }
        let seguridad = document.getElementById("seguridad2");
        if(seguridad.value === "" || seguridad.value.length !== 3 ){
            errores.push("El código de seguridad no puede estar vacío y debe ser de 3 caracteres.");
        }
        
        if(errores.length > 0){
            displayErrors(errores);
        } else {
            // Éxito: Limpia errores y haz la transición
            handleSuccessfulSubmission();
        }
    });

    // 3. Mercado Pago (MP)
    formularioMP.addEventListener("submit", function(e){
        e.preventDefault(); // Detener el envío por defecto SIEMPRE
        let errores = [];
        let verif = document.getElementById("verif");

        if(!verif.checked){
            errores.push("Debe confirmar que el pago fue realizado.");
        }

        if(errores.length > 0){
            displayErrors(errores);
        } else {
            // Éxito: Limpia errores y haz la transición
            handleSuccessfulSubmission();
        }
    });

    /* formulario dirección */

});