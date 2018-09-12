module.exports = function (unidades, UnidadService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.unidades = unidades.data;
  vm.totalItems = unidades.total;
  vm.itemsPerPage = unidades.per_page;
  vm.search = $stateParams;
  vm.search.page = unidades.current_page;
  vm.reload = false;

  vm.opcionesEstado = [
    {id: null, nombre: "Todos"},
    {id: 1, nombre: "Activo"},
    {id: 2, nombre: "Inactivo"}
  ];

  console.log('Unidades:', vm.unidades);
  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteUnidad(id, index);
    });
  };

  vm.deleteUnidad = function (id, index) {
    UnidadService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromUnidades(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromUnidades = function (index) {
    vm.unidades.splice(index, 1);
  };
};