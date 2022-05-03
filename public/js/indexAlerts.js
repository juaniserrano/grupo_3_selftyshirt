$(window).on('load', function () {
  $('#loading').hide();
  let notAllowedParam = new URL(location.href).searchParams.get('notAllowed');
  if (notAllowedParam) {
    swal('No Autorizado', 'No tiene los permisos para acceder a esta vista', 'error');
  }
  let userDeletedParam = new URL(location.href).searchParams.get('userDeleted');
  if (userDeletedParam) {
    swal('Rock', 'Usuario eliminado correctamente', 'success');
  }
});
