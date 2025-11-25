window.addEventListener("load", function(){ 
        const selectorForm = document.getElementById('selector_tarjetas')
        const formularios = document.querySelectorAll('.formulario_tarjeta')
        /* validacion formulario mastercard */
        let formularioMC = document.getElementById("formularioMC");
        /* validacion formulario visa */
        let formularioVS = document.getElementById("formularioVS");
       
        
        if(selectorForm){
        selectorForm.addEventListener('change', (event) => {
            
            if(event.target.name === 'pago') {
                const tarjetaSeleccionada = event.target.value; 

                formularios.forEach(form => {
                    form.style.display = 'none';
                });

                let idToShow;
                if (tarjetaSeleccionada === 'mp') {
                    idToShow = 'mp'; 
                } else {
                    idToShow = `formulario-${tarjetaSeleccionada}`; 
                } 
            const formularioMostrar = document.getElementById(idToShow);
                
                if(formularioMostrar){
                    formularioMostrar.style.display = 'block';
                }
            }
        })}
        
        formularioMC.addEventListener("submit", function(e){
        let errores = [];

        let nombre = document.getElementById("nombre")
        if(nombre.value === "" || nombre.value.length < 4 ){
            errores.push("el campo de nombre no puede estar vacio y debe tener al menos 4 caracteres")
        }
        let numeroTar = document.getElementById("numeroTar")
        if(numeroTar.value === "" || numeroTar.value.length !== 16 ){
           errores.push("el campo de numero de tarjeta no puede estar vacio y debe ser de 16 caracteres")
        }
         let caducidad = document.getElementById("caducidad")
        if(caducidad.value === ""){
            errores.push("el campo de fecha de caducidad no puede estar vacio")
        }
         let seguridad = document.getElementById("seguridad")
        if(seguridad.value === "" || seguridad.value.length !== 3 ){
            errores.push("el campo de nombre no puede estar vacio y debe ser de 3 caracteres")
        }
        
        /* si hay errores, no se sube, y manda para que salgan a la vista*/
        if(errores.length > 0){
            e.preventDefault();
            ulErrores = document.querySelector("div.errores2 ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
            
             ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
             
            }
        }
    })
    
    formularioVS.addEventListener("submit", function(e){
        let errores = [];

        let nombre = document.getElementById("nombre2")
        if(nombre.value === "" || nombre.value.length < 4 ){
            errores.push("el campo de nombre no puede estar vacio y debe tener al menos 4 caracteres")
        }
        let numeroTar = document.getElementById("numeroTar2")
        if(numeroTar.value === "" || numeroTar.value.length !== 16 ){
           errores.push("el campo de numero de tarjeta no puede estar vacio y debe ser de 16 caracteres")
        }
         let caducidad = document.getElementById("caducidad2")
        if(caducidad.value === ""){
            errores.push("el campo de fecha de caducidad no puede estar vacio")
        }
         let seguridad = document.getElementById("seguridad2")
        if(seguridad.value === "" || seguridad.value.length !== 3 ){
            errores.push("el campo de nombre no puede estar vacio y debe ser de 3 caracteres")
        }
        
        /* si hay errores, no se sube, y manda para que salgan a la vista*/
        if(errores.length > 0){
            e.preventDefault();
            ulErrores = document.querySelector("div.errores2 ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
            
             ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
             
            }
        }
    })
    });