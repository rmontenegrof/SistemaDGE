module.exports = function (estrategia, EstrategiaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Detalle';
  vm.data = estrategia;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.iniciativas = estrategia.iniciativas;

  console.log("data", vm.data);
  console.log("iniciativas", vm.iniciativas);

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