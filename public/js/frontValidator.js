window.addEventListener('load', function () {
  console.log('Hello! I am an alert box!!');
  //caputramos los campos del formulario
  let userForm = document.querySelector('#formNewUser'); // Se captura el formulario user
  let first_name = document.querySelector('#first_name');
  let last_name = document.querySelector('#last_name');
  let email = document.querySelector('#email');
  let password = document.querySelector('#password');
  let image = document.querySelector('#image');
  let loginForm = document.querySelector('#formLoginUser'); // Se captura el formulario login
  let emailLogin = document.querySelector('#emailLogin');
  let passwordLogin = document.querySelector('#passwordLogin');

  //VALIDACION DEL FORMULARIO DE REGISTRO//
  userForm.addEventListener('submit', function (e) {
    //Se crea el evento para los campos del form
    e.preventDefault();
    let errores = []; //
    console.log(errores);

    //VALIDACION DEL FIRST_NAME
    if (first_name.value == '' || first_name.value.length <= 2) {
      errores.push('El Nombre no puede estar vacío y debe contener al menos 2 caracteres');
    }

    //VALIDACION DEL LAST_NAME
    if (last_name.value == '' || last_name.value.length <= 2) {
      errores.push('El Apellido no puede estar vacío y debe contener al menos 2 caracteres');
    }

    //VALIDACION DEL EMAIL
    if (email.value == '') {
      errores.push('El email no puede estar vacío');
    }

    //VALIDACION PASSWORD
    if (password.value.length <= 8) {
      errores.push('La contraseña no debe ser menor a 8 caracteres');
    }

    //******ERRORES*****//
    if (errores.length > 0) {
      e.preventDefault();
      let ulErrors = document.querySelector('.errores');
      ulErrors.innerHTML = ''; // Se limpia el ul para que actualice los errores
      for (let i = 0; i < errores.length; i++) {
        ulErrors.innerHTML += `
        <div class="alert alert-danger w-100 text-center" role="alert">
            <li> ${errores[i]} </li></div>`;
      }
    } else {
      userForm.submit();
    }
  });

  //VALIDACION DEL LOGIN//
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let erroresLogin = []; //

    //VALIDACION DEL EMAIL
    if (emailLogin.value == '') {
      erroresLogin.push('Debe ingresar el email de usuario');
    }
    
    //VALIDACION PASSWORD
    if (passwordLogin.value == '') {
      erroresLogin.push('Debe ingresar la Contraseña');
    }

    //******ERRORES*****//
    if (erroresLogin.length > 0) {
      e.preventDefault();
      let ulErrores = document.querySelector('.errores');
      ulErrores.innerHTML = ''; // Se limpia el ul para que actualice los errores
      for (let i = 0; i < erroresLogin.length; i++) {
        ulErrores.innerHTML += `
        <div class="alert alert-danger w-100 text-center" role="alert">
            <li> ${erroresLogin[i]} </li></div>`;
      }
    } else {
      loginForm.submit();
    }
  });
});
