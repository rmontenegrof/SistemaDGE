module.exports = function (objetivo, ObjetivoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Detalle';
  vm.data = objetivo;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.estrategias = objetivo.estrategias;

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.getId = function () {
    return $stateParams.id;
  };

};