module.exports = function (unidades, UnidadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Envío de Comunicado';
  vm.data = {};
  vm.unidades = unidades.data;
  vm.errors = {};
  vm.formIsSubmit = false;

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    UnidadService.sendEmail(vm.data)
      .then(function(data) {
        toastr.success('Comunicado enviado exitosamente', 'Estado!');
        $state.go('app.panel', {}, {reload: true});
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