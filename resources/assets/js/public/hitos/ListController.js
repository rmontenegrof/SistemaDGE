module.exports = function (hitos, HitoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.hitos = hitos.data;
  vm.totalItems = hitos.total;
  vm.itemsPerPage = hitos.per_page;
  vm.search = $stateParams;
  vm.search.page = hitos.current_page;
  vm.reload = false;
  
  vm.filter = function () {
    console.log('search: ', vm.search);
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteResource(id, index);
    });
  };

  vm.deleteResource = function (id, index) {
    HitoService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromArray(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromArray = function (index) {
    vm.hitos.splice(index, 1);
  };
};