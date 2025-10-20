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
    /*let botonCerrar = */
      
    const showHtml = () =>{
        rowProduct.innerHTML = "";

        let total = 0;
        let totalProducts = 0;

        allProducts.forEach((product) =>{
            const containerProduct = document.createElement('div')
            containerProduct.classList.add('addCart')

            containerProduct.innerHTML = ` 
            <div class="productiño" data-id="${product.nombre}"><h4 class="elem"> ${ product.quantity } </h4><h4 class="elemName"> ${ product.nombre } </h4> <h4 class="elemNum"> ${ product.precio } </h4><h4 class="elemClose">X</h4></div>`
            rowProduct.append(containerProduct)
            total = total + parseInt(product.quantity * product.precio)
            totalProducts = totalProducts + product.quantity;
        })
    valorTotal.innerText = `$${total}`
    countProductos.innerText = `carrito( ${totalProducts} )`
    }

    logo.addEventListener("click", function(){
       /* alert("me an tocao");*/
        window.location.href = "/";
    })
    inicioSesion.addEventListener("click", function(){
        window.location.href = "/usuarios/inicioSesion";
    })
    registro.addEventListener("click", function(){
        window.location.href = "/usuarios/registro";
    })
    lsitaUsuarios.addEventListener("click", function(){
        window.location.href = "/usuarios/listaUsuarios";
    })
    creaProducto.addEventListener("click", function(){
        window.location.href = "/productos/creaProducto";
    })
    finalizar.addEventListener("click", function(){
        alert("gracias por su compra")
        window.location.href = "/";
    })
    carritoIcon.addEventListener("click", function(){
        fixed2.classList.toggle('carrote')
    })
    perfilBtnnId.addEventListener("click", function(){
        fixed3.classList.toggle('perfilBtnn')
    })
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
        }else{
            return product
            }
          })
          allProducts = [...products]
        }else{
            allProducts = [...allProducts, infoProduct]
        }
        showHtml()
    })
    })

    rowProduct.addEventListener('click', (e) => {
  if (e.target.classList.contains('elemClose')) {
    const productElement = e.target.parentElement;
    const id = productElement.getAttribute('data-id'); 

    allProducts = allProducts.filter(item => item.nombre !== id);

    console.log("Producto eliminado:", id);
    console.log("Carrito actualizado:", allProducts);

    showHtml();
  }
});
})