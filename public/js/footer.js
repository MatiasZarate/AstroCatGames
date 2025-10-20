window.addEventListener("load", function(){
    let quieneSomos = document.getElementById("quieneSomos");
    let wazaa = document.querySelector(".wazaa");
    let instaa = document.querySelector(".instaa");

  quieneSomos.addEventListener("click", function(){
    Swal.fire({
  title: "Quienes somos?",
  text: "Astro Cat Games es una tienda virtual del rubro de videojuegos en Argentina, donde podrás comprar todo tipo de productos de este rubro de una forma rápida y segura, llevando el producto a tu casa sin costo de envio. Además, al crear una cuenta y registrarte se te adquiere el permiso de vender tus propios productos a otros usuarios de la página, además de otras funcionalidades exclusivas",
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
    })
 instaa.addEventListener("click", function(){
        window.open("https://www.instagram.com/axl.orosco/", "_blank", "noopener,noreferrer");
    }) 
})