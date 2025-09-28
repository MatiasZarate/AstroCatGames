window.addEventListener("load", function(){
    let editar = document.querySelectorAll(".editar");
    let editarBtn = document.querySelectorAll(".editarBtn");
    let perfilBtn = document.querySelectorAll(".perfilBtn");
    
    editarBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/usuarios/editar/" + id;
    })});
    perfilBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/usuarios/perfil/" + id;
    })});
})