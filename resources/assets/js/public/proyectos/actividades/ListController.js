module.exports = function (actividades, ProyectoActividadService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.actividades = actividades.data;
  vm.totalItems = actividades.total;
  vm.itemsPerPage = actividades.per_page;
  vm.search = $stateParams;
  vm.search.page = actividades.current_page;
  vm.reload = false;

  console.log("data", vm.actividades);

  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteActividades(id, index);
    });
  };

  vm.deleteActividades = function (id, index) {
    ProyectoActividadService.deleteResource(id)
      .then(function(data) {
        vm.removeActividades(index);
        toastr.success(data.data.message, 'Estado!');
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeActividades = function (index) {
    vm.actividades.splice(index, 1);
  };
};