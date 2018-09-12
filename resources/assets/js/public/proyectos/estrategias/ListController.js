module.exports = function (estrategias, ProyectoEstrategiaService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.estrategias = estrategias.data;
  vm.totalItems = estrategias.total;
  vm.itemsPerPage = estrategias.per_page;
  vm.search = $stateParams;
  vm.search.page = estrategias.current_page;
  vm.reload = false;

  console.log("data", estrategias);

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
      vm.deleteEstrategia(id, index);
    });
  };

  vm.deleteEstrategia = function (id, index) {
    ProyectoEstrategiaService.deleteResource(id)
      .then(function(data) {
        vm.removeEstrategia(index);
        toastr.success(data.data.message, 'Estado!');
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeEstrategia = function (index) {
    vm.estrategias.splice(index, 1);
  };
};