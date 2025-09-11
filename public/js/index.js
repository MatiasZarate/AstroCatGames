window.addEventListener("load", function(){
    let perfilBtn = document.querySelectorAll(".perfilBtn");


    perfilBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/productos/detalleProducto/" + id;
    });
    });
})