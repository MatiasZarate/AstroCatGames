window.addEventListener("load", function(){
    let formulario2 = document.getElementById("formularioSesion")

    formulario2.addEventListener("submit", function(e){
        let errorres = [];

        let nombre = document.getElementById("nombre")
        if(nombre.value === ""){
            errorres.push("el campo de nombre no puede estar vacio")
        }
        let contraseña = document.getElementById("contraseña")
        if(contraseña.value == ""){
            errorres.push("el campo de contraseña no puede estar vacio")
        } /*verificación frontend */

         if(errorres.length > 0){
            e.preventDefault();
            ulErrorres = document.querySelector("div.errorres ul")
            ulErrorres.innerHTML = " "
            for(let i=0; i < errorres.length; i++){
            
             ulErrorres.innerHTML += "<li>" + errorres[i] + "</li>"
             
            }
        }
    })
})

