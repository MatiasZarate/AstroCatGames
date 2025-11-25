window.addEventListener("load", function(){
    /*const inicioSesion = */
    let formulario = document.getElementById("formularioCreaProducto");

    formulario.addEventListener("submit", function(e){
        let errores = [];

        let nombre = document.getElementById("nombre")
        if(nombre.value === "" || nombre.value.length > 12 ){
            errores.push("el campo de nombre no puede estar vacio o ser mayor de 12 caracteres")
        }
        let categoria = document.getElementById("categoria")
        if(categoria.value == ""){
            errores.push("el campo de categoria no puede estar vacio")
        }
        let descripcion = document.getElementById("descripcion")
        if(descripcion.value == ""){
            errores.push("el campo de descripcion no puede estar vacio")
        }
        let precio = document.getElementById("precio")
        if(precio.value == ""){
            errores.push("el campo de precio no puede estar vacio")
        }
        let cantidad = document.getElementById("cantidad")
        if(cantidad.value == ""){
            errores.push("el campo de cantidad no puede estar vacio")
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