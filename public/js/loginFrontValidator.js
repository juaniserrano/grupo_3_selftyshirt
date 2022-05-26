window.addEventListener('load', function () {
  console.log('test to see if Script is working');
  //caputramos los campos del formulario
  let loginForm = document.querySelector('#formLoginUser'); // Se captura el formulario login
  let emailLogin = document.querySelector('#emailLogin');
  let passwordLogin = document.querySelector('#passwordLogin');

  //VALIDACION DEL FORMULARIO DE REGISTRO//
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let erroresLogin = []; //
    console.log(loginForm);
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
