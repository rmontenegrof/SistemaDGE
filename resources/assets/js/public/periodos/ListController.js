module.exports = function (periodos, PeriodoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.periodos = periodos.data;
  vm.totalItems = periodos.total;
  vm.itemsPerPage = periodos.per_page;
  vm.search = $stateParams;
  vm.search.page = periodos.current_page;
  vm.reload = false;

  vm.opcionesEstado = [
    {id: null, nombre: "Todos"},
    {id: 1, nombre: "Activo"},
    {id: 2, nombre: "Inactivo"}
  ];

  console.log('Periodos:', vm.periodos);
  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

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
    vm.periodos.splice(index, 1);
  };
};