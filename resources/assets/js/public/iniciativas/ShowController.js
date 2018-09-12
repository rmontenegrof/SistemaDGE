module.exports = function (iniciativa, unidades, IniciativaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Ver';
  vm.data = iniciativa;
  vm.unidades = unidades;

  this.getId = function () {
    return $stateParams.id;
  };
};