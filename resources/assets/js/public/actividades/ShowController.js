module.exports = function (actividad, ActividadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Ver';
  vm.data = actividad;


  this.getId = function () {
    return $stateParams.id;
  };
};