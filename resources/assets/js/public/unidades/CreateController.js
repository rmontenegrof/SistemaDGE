module.exports = function (grupos ,UnidadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {
  };
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesEstado = [
    {id: 1, nombre: "Activo"},
    {id: 0, nombre: "Inactivo"}
  ];

  vm.grupos = grupos;

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    UnidadService.createResource(vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.unidades', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };
};