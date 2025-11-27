window.addEventListener("load", function(){
    /*const inicioSesion = */
    let formulario = document.getElementById("formularioCreaProducto");

    formulario.addEventListener("submit", function(e){
        let errores = [];

        
        let oferta = document.getElementById("oferta")
        let preciooriginal = document.getElementById("precioOriginal")
        if(oferta.value == "" || oferta.value >= preciooriginal.value){
            errores.push("El campo oferta debe ser menor al valor original y no estar vacio")
        }
        
        /* si hay errores, no se sube, y manda para que salgan a la vista*/
        if(errores.length > 0){
            e.preventDefault();
            ulErrores = document.querySelector("div.errores ul")
            ulErrores.innerHTML = " "
            for(let i=0; i < errores.length; i++){
            
             ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
             
            }
        }

       
    })
})