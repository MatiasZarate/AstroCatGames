window.addEventListener("load", function(){
    let editar = document.querySelectorAll(".editar");
    let editarBtn = document.querySelectorAll(".editarBtn");

   /* editar.addEventListener("click", function(){
        alert("me an tocao");
        window.location.href = "/";
    })*/
   /*editar.forEach((boton, i)=>{
    boton.addEventListener("click", () =>{
        alert("me an tocao");
        window.location.href = "/usuarios/editar/<%= cuentas.id %>";
    })
   })*/
    editarBtn.forEach((boton) => {
    boton.addEventListener("click", () => {
    let id = boton.getAttribute("data-id");
    window.location.href = "/usuarios/editar/" + id;
    });
    });
})