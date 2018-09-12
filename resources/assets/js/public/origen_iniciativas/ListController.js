module.exports = function (origenes, OrigenIniciativaService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.origenes = origenes.data;
  vm.totalItems = origenes.total;
  vm.itemsPerPage = origenes.per_page;
  vm.search = $stateParams;
  vm.search.page = origenes.current_page;
  vm.reload = false;
  
  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteOrigen(id, index);
    });
  };

  vm.deleteOrigen = function (id, index) {
    OrigenIniciativaService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromOrigenes(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromOrigenes = function (index) {
    vm.unidades.splice(index, 1);
  };
};