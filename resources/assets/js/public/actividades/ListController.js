module.exports = function (actividades, ActividadService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.actividades = actividades.data;
  vm.totalItems = actividades.total;
  vm.itemsPerPage = actividades.per_page;
  vm.search = $stateParams;
  vm.search.page = actividades.current_page;
  vm.reload = false;

  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteResource(id, index);
    });
  };

  vm.deleteResource = function (id, index) {
    ActividadService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromArray(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromArray = function (index) {
    vm.actividades.splice(index, 1);
  };
};