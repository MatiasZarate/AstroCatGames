window.addEventListener("load", function(){
    let perfilBtn = document.querySelectorAll(".perfilBtn");
    let videojuegosBtn = document.querySelectorAll(".btn1");
    let consolaBtn = document.querySelectorAll(".btn2");
    let accesoriosBtn = document.querySelectorAll(".btn3");
    let merchBtn = document.querySelectorAll(".btn4");
    let packsBtn = document.querySelectorAll(".btn5");

    perfilBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/productos/detalleProducto/" + id; /*envia el id para ser usado en el perfil */
    });
    });
    videojuegosBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    window.location.href = "/categorias/videojuegos";
    });
    });
    consolaBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    window.location.href = "/categorias/consolas";
    });
    });
    accesoriosBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    window.location.href = "/categorias/accesorios";
    });
    });
    merchBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    window.location.href = "/categorias/merch";
    });
    });
    packsBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    window.location.href = "/categorias/packs";
    });
    });
})