window.addEventListener("load", function(){
    let logo = document.getElementById("logo")
    let inicioSesion = document.getElementById("inicioSesion")
    let registro = document.getElementById("registro")
    let carritoBtn = document.getElementById("carritoIcon")
    let tarjeta = document.getElementById("tarjeta")
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
    
    
 
    const showHtml = () =>{ /*muestra el carrito */
        rowProduct.innerHTML = "";

        let total = 0;
        let totalProducts = 0;

        allProducts.forEach((product) =>{
            const containerProduct = document.createElement('div')
            containerProduct.classList.add('addCart')
            
            if (usuarioLogueado) {
               if(product.ofertas){
                containerProduct.innerHTML = ` 
            <div class="productiño" data-id="${product.nombre}"><h4 class="elem valorTotal"> ${ product.quantity } </h4><h4 class="elemName"> ${ product.nombre } </h4> <h4 class="elemNum valorTotal"> ${ product.ofertas } </h4><h4 class="elemClose">X</h4></div>`
               }else{
                containerProduct.innerHTML = ` 
            <div class="productiño" data-id="${product.nombre}"><h4 class="elem valorTotal"> ${ product.quantity } </h4><h4 class="elemName"> ${ product.nombre } </h4> <h4 class="elemNum valorTotal"> ${ product.precio } </h4><h4 class="elemClose">X</h4></div>`
               }
            }else{
                containerProduct.innerHTML = ` 
            <div class="productiño" data-id="${product.nombre}"><h4 class="elem valorTotal"> ${ product.quantity } </h4><h4 class="elemName"> ${ product.nombre } </h4> <h4 class="elemNum valorTotal"> ${ product.precio } </h4><h4 class="elemClose">X</h4></div>`
            }
            
            
            
            rowProduct.append(containerProduct)

            if (usuarioLogueado) {
            if(product.ofertas){
                total = total + parseInt(product.quantity * product.ofertas)
            }else{
                total = total + parseInt(product.quantity * product.precio)
            }
            }else{
                total = total + parseInt(product.quantity * product.precio)
            }


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
      // 🚨 ESTA ES LA NORMALIZACIÓN CLAVE QUE DEBE ESTAR EN TU HEADER.JS 🚨
      allProducts = data.carrito.map(product => ({
        ...product,
        // Convierte la oferta a número > 0 o a null si no es válida.
        ofertas: (product.ofertas && parseFloat(product.ofertas) > 0) ? parseFloat(product.ofertas) : null,
        // Convierte el precio a número
        precio: parseFloat(product.precio)
      }));
      
      console.log("🧾 Carrito normalizado:", allProducts);
      showHtml(); // actualiza la vista del carrito
    } else {
      console.log("🧾 Carrito vacío o no encontrado en sesión.");
    }
  } catch (err) {
    console.error("Error al cargar carrito:", err);
  }
})();

    logo.addEventListener("click", function(){
    window.location.href="/"
    })

    inicioSesion.addEventListener("click", function(){
        if(usuarioLogueado){ /* verifica que el usuario este logueado, sino, lo manda a logearse por pssy */
        Swal.fire({
        title: "Deslogueate si quieres iniciar sesión en otra cuenta",
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
    }/*no se que hace acá D: */
    

    lsitaUsuarios.addEventListener("click", function(){
        if(usuarioLogueado && usuarioLogueadoAdmin){ /*oculta si no tienes admin, y no te deja entrar */
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
        } 
    })

    
    /*tarjeta.addEventListener("click", function(){
    window.location.href="/productos/tarjeta"
    })*/
    creaProducto.addEventListener("click", function(){
        if(usuarioLogueado){
            window.location.href = "/productos/creaProducto";
        }else{
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
        if (allProducts.length > 0){
           /*Swal.fire({
        title: "MUCHAS GRACIAS POR SU COMPRA!!",
        background: "url('https://res.cloudinary.com/dduyxqrqt/image/upload/v1752363693/silver-metallic-background-free-photo_oqg363.jpg')",
        confirmButtonColor:"purple",
        color: "black",
        showConfirmButton: false,
        customClass: {
            popup: 'my-custom-popup-border'
        },
        }); */
       /*setTimeout(function() {*/
        window.location.href = "/productos/tarjeta";
        /*}, 2000);  */
        }else{
        Swal.fire({
        title: "no hay productos en el carrito",
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
    carritoIcon.addEventListener("click", function(){
        fixed2.classList.toggle('carrote')
    })
    perfilBtnnId.addEventListener("click", function(){
        if(!usuarioLogueado){
            console.log("aaaaaaaaa")
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
            console.log("aaaaaaaaaa")
        fixed3.classList.toggle('perfilBtnn')
        } 
    })
    /*tecnicamente podría borrar el if en esos 2 siguientes*/ 
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

    agregar.forEach((boton) => { /*agrega los productos al carrito*/
         boton.addEventListener("click", function() {
        let id = boton.getAttribute("data-id");
        const precioStr = boton.getAttribute("data-price");
        const ofertaStr = boton.getAttribute("data-ofertas");

       

        const infoProduct = {
            quantity: 1,
            nombre : boton.getAttribute("data-name"),
            precio : parseFloat(precioStr),
            ofertas : (ofertaStr && ofertaStr !== "0") ? parseFloat(ofertaStr) : null 
        } /*almacena toda la info del producto */
    
        console.log("Objeto guardado en infoProduct:", infoProduct);
        const exist = allProducts.some(product => product.nombre === infoProduct.nombre) /*la manda al carro */
        
        if (exist){
          const products = allProducts.map(product => { /*si existe le suma cantidad, sino lo añade */
            if(product.nombre === infoProduct.nombre){
                product.quantity++;
            return product
           
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
        }); /*lo escribe */

        showHtml()
    })
    })

    rowProduct.addEventListener('click', async (e) => {
  if (e.target.classList.contains('elemClose')) {
    const productElement = e.target.parentElement;
    const nombre = productElement.getAttribute('data-id'); 

    allProducts = allProducts.filter(item => item.nombre !== nombre);
    showHtml(); /*elimina el producto al tocar la x */
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
