module.exports = function (periodo, PeriodoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Ver';
  vm.periodo = periodo;

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deletePeriodo(id, index);
    });
  };

  vm.deletePeriodo = function (id, index) {
    PeriodoService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromPeriodos(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromPeriodos = function (index) {
    vm.zonas.splice(index, 1);
  };
};