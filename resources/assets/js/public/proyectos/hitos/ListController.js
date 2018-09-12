module.exports = function (hitos, ProyectoHitoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.hitos = hitos.data;
  vm.totalItems = hitos.total;
  vm.itemsPerPage = hitos.per_page;
  vm.search = $stateParams;
  vm.search.page = hitos.current_page;
  vm.reload = false;

  console.log("data", vm.hitos);

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
      vm.deleteHitos(id, index);
    });
  };

  vm.deleteHitos = function (id, index) {
    ProyectoHitoService.deleteResource(id)
      .then(function(data) {
        vm.removeEstrategia(index);
        toastr.success(data.data.message, 'Estado!');
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeEstrategia = function (index) {
    vm.hitos.splice(index, 1);
  };
};