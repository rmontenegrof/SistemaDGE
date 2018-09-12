module.exports = function (focos, FocoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.focos = focos.data;
  vm.totalItems = focos.total;
  vm.itemsPerPage = focos.per_page;
  vm.search = $stateParams;
  vm.search.page = focos.current_page;
  vm.reload = false;
  
  vm.opcionesEstado = [
    {id: null, nombre: "Todos"},
    {id: 1, nombre: "Activo"},
    {id: 2, nombre: "Inactivo"}
  ];
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
    FocoService.deleteResource(id)
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