module.exports = function (usuario, unidades, UserService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = usuario;
  vm.unidades = unidades;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesTipo = [
    {id: 1, nombre: "Usuario Unidad"},
    {id: 2, nombre: "Usuario de Consulta"},
    {id: 3, nombre: "Administrador"}
  ];

  console.log("unidades: ", vm.unidades);
  console.log("user_data: ", vm.data);
  inicializar();

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    UserService.updateResource(vm.getId(), vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.users', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };

  this.getId = function () {
    return $stateParams.id;
  };

  function inicializar(){
    var x = [];
    for (var i = usuario.unidades.length - 1; i >= 0; i--) {
      x.push({ id: usuario.unidades[i].unidad.id_unidad_estrategica,
        unidad: usuario.unidades[i].unidad.unidad});
    }
    vm.data.unidades = x; 
  }
};