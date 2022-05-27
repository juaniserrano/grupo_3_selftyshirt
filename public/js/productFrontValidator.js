window.addEventListener('load', function () {
    let form = document.getElementById('productCreateForm');
    let name = document.getElementById('name');
    let price = document.getElementById('price');
    let discount = document.getElementById('discount');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let stock = document.getElementById('stockquantity');
    let image = document.getElementById('imageproduct');

    console.log(name, price, discount, description, category, stock, image);

    form.addEventListener('submit', function (e) {
        let erroresProduct = []; //
        //VALIDACION DEL NOMBRE
        if (name.value.length < 5) {
            erroresProduct.push('El nombre del producto debe tener al menos 5 caracteres');
        }

        if (description.value.length < 20) {
            erroresProduct.push('La descripción del producto debe tener al menos 20 caracteres');
        }

        //******ERRORES*****//
        if (erroresProduct.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector('.errores');
            ulErrores.innerHTML = ''; // Se limpia el ul para que actualice los errores
            for (let i = 0; i < erroresProduct.length; i++) {
                ulErrores.innerHTML += `
        <div class="alert alert-danger w-100 text-center" role="alert">
            <li> ${erroresProduct[i]} </li></div>`;
            }
        } else {
            form.submit();
        }
    });
});
