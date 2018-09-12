module.exports = function (foco, FocoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Ver';
  vm.foco = foco;

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteFoco(id, index);
    });
  };

  vm.deleteFoco = function (id, index) {
    PeriodoService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromFocos(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromFocos = function (index) {
    vm.focos.splice(index, 1);
  };
};