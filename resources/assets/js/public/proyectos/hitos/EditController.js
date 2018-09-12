module.exports = function (hito, origenes, proyectos, ProyectoHitoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = hito;
  vm.errors = {};
  vm.origenes = origenes;
  vm.proyectos = proyectos;
  vm.formIsSubmit = false;

  console.log("data:", vm.data );

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ProyectoHitoService.updateResource(vm.getId(),vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.hitos2', {}, {reload: true});
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