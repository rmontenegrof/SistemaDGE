module.exports = function (estrategias, unidades, ProyectoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {};
  vm.errors = {};
  vm.formIsSubmit = false;

  vm.estrategias = estrategias;
  vm.unidades = unidades;

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ProyectoService.createResource(vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.estrategias2', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };
};