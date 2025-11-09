window.addEventListener("load", function(){
    let logo = document.getElementById("logo")
    let inicioSesion = document.getElementById("inicioSesion")
    let registro = document.getElementById("registro")
    let carritoBtn = document.getElementById("carritoIcon")
    let lsitaUsuarios = document.getElementById("listaUsuarios")
    let creaProducto = document.getElementById("creaProducto")
    let carritoIcon = document.getElementById("carritoIcon")
    let finalizar = document.getElementById("finalizar")
    let fixed2 = document.querySelector('.fixed2')
    let fixed3 = document.querySelector('.fixed3')
    let perfilBtnnId = document.getElementById("perfilBtnnId")
    let botonesPerfilHeader = document.querySelector('.botonesPerfilHeader')
    let botonesCerrarSesHeader = document.querySelector('.botonesCerrarSesHeader')
    let agregar = document.querySelectorAll('.agregar')
    let rowProduct = document.querySelector('.addCart')
    let allProducts = []
    const valorTotal = document.querySelector('.valorTotal')
    const containerProduct = "";
    const countProductos = document.querySelector('.carritoCount')
    const fixed = document.querySelector('.fixed')
    const usuarioLogueado = fixed.dataset.user === 'true';
    const usuarioLogueadoAdmin = fixed.dataset.userAdmin === 'true';
    /*let botonCerrar = */
    
    

    const showHtml = () =>{
        rowProduct.innerHTML = "";

        let total = 0;
        let totalProducts = 0;

        allProducts.forEach((product) =>{
            const containerProduct = document.createElement('div')
            containerProduct.classList.add('addCart')

            containerProduct.innerHTML = ` 
            <div class="productiño" data-id="${product.nombre}"><h4 class="elem valorTotal"> ${ product.quantity } </h4><h4 class="elemName"> ${ product.nombre } </h4> <h4 class="elemNum valorTotal"> ${ product.precio } </h4><h4 class="elemClose">X</h4></div>`
            rowProduct.append(containerProduct)
            total = total + parseInt(product.quantity * product.precio)
            totalProducts = totalProducts + product.quantity;
        })
    valorTotal.innerText = `$${total}`
    countProductos.innerText = `carrito( ${totalProducts} )`
    }

    (async () => {
  try {
    const res = await fetch("/carrito");
    const data = await res.json();

    if (data.carrito && data.carrito.length > 0) {
      console.log("🧾 Carrito cargado desde sesión:", data.carrito);
      allProducts = data.carrito;
      showHtml(); // actualiza la vista del carrito
    } else {
      console.log("🧾 Carrito vacío o no encontrado en sesión.");
    }
  } catch (err) {
    console.error("Error al cargar carrito:", err);
  }
})();

    logo.addEventListener("click", function(){
       /* alert("me an tocao");*/
    window.location.href="/"
        

    })
    inicioSesion.addEventListener("click", function(){
        if(usuarioLogueado){
        Swal.fire({
        title: "Deslogueate si quieres iniciar sesión nuevamente",
        draggable: true,
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        customClass: {
            popup: 'my-custom-popup-border'
        },
        });
        }else{
            window.location.href = "/usuarios/inicioSesion";
        }     
    })
    registro.addEventListener("click", function(){
        window.location.href = "/usuarios/registro";
    })

    
    if (!usuarioLogueadoAdmin) {
    // Oculta el botón si el usuario NO es admin
    lsitaUsuarios.style.display = "none";
    }
    

    lsitaUsuarios.addEventListener("click", function(){
        if(usuarioLogueado && usuarioLogueadoAdmin){
        window.location.href = "/usuarios/listaUsuarios";
        } else if (!usuarioLogueado){
        Swal.fire({
        title: "Debes iniciar sesión primero",
        draggable: true,
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        customClass: {
            popup: 'my-custom-popup-border'
        },
        });
        } /*else {
        listaUsuarios.classList.toggle('carrote')
        }*/
    })

    

    creaProducto.addEventListener("click", function(){
        if(usuarioLogueado){
            window.location.href = "/productos/creaProducto";
        }else{
            /*alert("debes iniciar sesión primero")*/
        Swal.fire({
        title: "Debes iniciar sesión primero",
        draggable: true,
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        customClass: {
            popup: 'my-custom-popup-border'
        },
        });
        }
    })
    finalizar.addEventListener("click", function(){
        /*alert("gracias por su compra") */
        Swal.fire({
        title: "MUCHAS GRACIAS POR SU COMPRA!!",
        /*draggable: true,*/
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        /*timer: 10000,*/
        showConfirmButton: false,
        imageUrl: "https://res.cloudinary.com/dduyxqrqt/image/upload/v1762457776/Cat_Shoppingcartt_a2wmg4.png",
        customClass: {
            popup: 'my-custom-popup-border'
        },
        });
        setTimeout(function() {
        window.location.href = "/";
        }, 2000);/*luego cuando añada el session en el carrito lo modificare para que no sea solo 5 segundos de ver al gato y ya*/ 
    })
    carritoIcon.addEventListener("click", function(){
        fixed2.classList.toggle('carrote')
    })
    perfilBtnnId.addEventListener("click", function(){
        if(!usuarioLogueado){
        Swal.fire({
        title: "Debes iniciar sesión primero",
        draggable: true,
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        customClass: {
            popup: 'my-custom-popup-border'
        },
        });
        }else{
        fixed3.classList.toggle('perfilBtnn')
        } 
    })
    /*tecnicamente debería borrar el if en esos 2 siguientes*/
    botonesPerfilHeader.addEventListener("click", function(){
       
        if(usuarioLogueado){
            let id = botonesPerfilHeader.getAttribute("data-id");
            window.location.href = "/usuarios/perfil/" + id;
        }else{
            alert("debes iniciar sesión primero")
        }
   
    })
    botonesCerrarSesHeader.addEventListener("click", function(){
        if(usuarioLogueado){
            window.location.href = "/logOut";
        }else{
            alert("debes iniciar sesión primero")
        }
    })
    agregar.forEach((boton) => {
         boton.addEventListener("click", function() {
        let id = boton.getAttribute("data-id");

        const infoProduct = {
            quantity: 1,
            nombre : boton.getAttribute("data-name"),
            precio : boton.getAttribute("data-price")
        }
    
        const exist = allProducts.some(product => product.nombre === infoProduct.nombre)
        
        if (exist){
          const products = allProducts.map(product => {
            if(product.nombre === infoProduct.nombre){
                product.quantity++;
            return product
           /* req.session.products = infoProduct;*/
        }else{
            return product
            }
          })
          allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct]
        }
        
        fetch("/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(infoProduct)
        });

        showHtml()
    })
    })

    rowProduct.addEventListener('click', async (e) => {
  if (e.target.classList.contains('elemClose')) {
    const productElement = e.target.parentElement;
    const nombre = productElement.getAttribute('data-id'); 

    /*allProducts = allProducts.filter(item => item.nombre !== id);*/
    allProducts = allProducts.filter(item => item.nombre !== nombre);
    showHtml();

    /*console.log("Producto eliminado:", id);
    console.log("Carrito actualizado:", allProducts);*/
    /*console.log(req.session.product)*/

    /*showHtml();*/
     try {
      await fetch("/eliminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre })
      });
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  }
})

})
