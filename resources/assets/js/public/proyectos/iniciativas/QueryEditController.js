module.exports = function (proyecto, estrategias, unidades, ProyectoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = proyecto;
  vm.errors = {};
  vm.estrategias = estrategias;
  vm.unidades = unidades;
  vm.formIsSubmit = false;

  console.log("data:", vm.data );

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ProyectoService.updateResource(vm.getId(),vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.queryProyectos', {}, {reload: true});
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
};