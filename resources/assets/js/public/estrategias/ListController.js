module.exports = function (estrategias, EstrategiaService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.estrategias = estrategias.data;
  vm.totalItems = estrategias.total;
  vm.itemsPerPage = estrategias.per_page;
  vm.search = $stateParams;
  vm.search.page = estrategias.current_page;
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

  console.log("Estrategias", vm.estrategias );

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteObjetivo(id, index);
    });
  };

  vm.deleteObjetivo = function (id, index) {
    EstrategiaService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromFocos(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromFocos = function (index) {
    vm.estrategias.splice(index, 1);
  };
};