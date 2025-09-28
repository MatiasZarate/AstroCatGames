window.addEventListener("load", function(){
    let editarBtn = document.querySelectorAll(".editarBtn");

    editarBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/productos/editarProducto/" + id;
    });
    });
})