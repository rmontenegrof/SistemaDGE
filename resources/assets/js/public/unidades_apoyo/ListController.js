module.exports = function (unidades, UnidadApoyoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.unidades = unidades.data;
  vm.totalItems = unidades.total;
  vm.itemsPerPage = unidades.per_page;
  vm.search = $stateParams;
  vm.search.page = unidades.current_page;
  vm.reload = false;
  
  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteUnidadApoyo(id, index);
    });
  };

  vm.deleteUnidadApoyo = function (id, index) {
    UnidadApoyoService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromUnidadesApoyo(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromUnidadesApoyo = function (index) {
    vm.unidades.splice(index, 1);
  };
};