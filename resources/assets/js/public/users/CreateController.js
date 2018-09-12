module.exports = function (unidades ,UserService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {
    unidades: []
  };
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesTipo = [
    {id: 1, nombre: "Usuario Unidad"},
    {id: 2, nombre: "Usuario de Consulta"},
    {id: 3, nombre: "Administrador"}
  ];

  vm.unidades = unidades;

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    UserService.createResource(vm.data)
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

};