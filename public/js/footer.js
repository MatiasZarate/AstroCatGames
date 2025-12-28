window.addEventListener("load", function(){
    let quieneSomos = document.getElementById("quieneSomos");
    let wazaa = document.querySelector(".wazaa");
    let instaa = document.querySelector(".instaa");

  quieneSomos.addEventListener("click", function(){
    Swal.fire({
  title: "Quienes somos?",
  text: "Astro Cat Games es un local de venta de videojuegos, ubicado en *, donde encontrarás todo tipo de productos del rubro gamer, de forma facil, rapida y segura. Puedes comprar como invitado, o como usuario, los cuales tienen ofertas exclusivas y otros beneficios. Puedes retirar tus compras del local, o también pedir a que se te envien a tu casa, sin costo de envio",
  imageUrl: "https://res.cloudinary.com/dduyxqrqt/image/upload/v1754835575/ce709d639337a5cb3d5e4da462e1d76f_nm3o5v.jpg",
  imageWidth: 400,
  imageHeight: 200,
  background:"purple",
  color:"black",
  confirmButtonColor:"black",
})
})
 wazaa.addEventListener("click", function(){
       window.open("https://wa.me/5493624934018?text=hola, quiero info del negocio", "_blank", "noopener,noreferrer");
    }) /*sirve para redirigir a un whatsapp, y el text para queel usuario tenga un mensaje predeterminado para mandar */
 instaa.addEventListener("click", function(){
        window.open("https://www.instagram.com/axl.orosco/", "_blank", "noopener,noreferrer");
    })  /*nooponer noreferrer es para que no se abra una ventana extra mientras abres el link externo */
})