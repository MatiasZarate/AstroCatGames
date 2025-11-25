window.addEventListener("load", function(){
    let editarBtn = document.querySelectorAll(".editarBtn");
    /*let ofertaBtn = document.querySelectorAll(".ofertaBtn");*/
    /*localiza el id seleccionado y lo usa en la vista */
    editarBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/productos/editarProducto/" + id;
    });
    });
    /*ofertaBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/productos/editarProducto/" + id;
    });
    });*/
})