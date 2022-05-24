                // ***** VALIDACION REGISTRO DE USUARIOS ****///
// window.addEventListener("load", function(){

// 	let userForm = document.querySelector("form .form-control p-2 my-1");   // Se captura el formulario
// 	userForm.addEventListener("submit", function(e){                       //Se crea el evento para los campos del form
//  let errores = [];                                                     //

// VALIDACION DEL FIRST_NAME
// 		let first_name = document.querySelector("input #first_name");
// 		if(first_name.value == "") || (first_name.value <= 2){
// 			errores.push("El Nombre no puede estar vacío y debe contener al menos 2 caracteres");
// 		};
//
// VALIDACION DEL LAST_NAME
// 		//let last_name = document.querySelector("input #last_name");
// 		if(last_name.value == "" || last_name.value <= 2){
// 			errores.push("El Apellido no puede estar vacío y debe contener al menos 2 caracteres");
// 		};
//
// VALIDACION DEL EMAIL
// 		//let email = document.querySelector("input #email");
//
// VALIDACION PASSWORD
// 		//let password = document.querySelector("input #password");
//      if(password.value.length >= 8){
// 			errores.push("La contraseña no debe ser menor a 8 caracteres");
// 		};
//
//           //******ERRORES*****//
//     if (errors.length > 0) {
//          e.preventDefault();
//          let ulErrors = document.querySelector('.errores');
//          ulErrors.innerHTML = ''; // Se limpia el ul para que actualice los errores
//          for (let i = 0; i < errors.length; i++) {
//              ulErrors.innerHTML += <li >  ${errors[i]} </li>;
//           };
//     }else{
//          alert('Te has registrado Éxitosamente')
//          form.submit();
//          }
// 	})
// })