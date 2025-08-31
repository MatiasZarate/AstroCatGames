window.addEventListener("load", function(){
    let logo = document.getElementById("logo")
    let inicioSesion = document.getElementById("inicioSesion")
    let registro = document.getElementById("registro")
    let lsitaUsuarios = document.getElementById("listaUsuarios")

    logo.addEventListener("click", function(){
       /* alert("me an tocao");*/
        window.location.href = "/";
    })
    inicioSesion.addEventListener("click", function(){
        /*alert("me an tocao");*/
        window.location.href = "/usuarios/inicioSesion";
    })
    registro.addEventListener("click", function(){
        /*alert("me an tocao");*/
        window.location.href = "/usuarios/registro";
    })
    lsitaUsuarios.addEventListener("click", function(){
        /*alert("me an tocao");*/
        window.location.href = "/usuarios/listaUsuarios";
    })
})