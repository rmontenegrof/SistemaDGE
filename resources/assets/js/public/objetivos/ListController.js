module.exports = function (objetivos, ObjetivoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.objetivos = objetivos.data;
  vm.totalItems = objetivos.total;
  vm.itemsPerPage = objetivos.per_page;
  vm.search = $stateParams;
  vm.search.page = objetivos.current_page;
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
      vm.deleteObjetivo(id, index);
    });
  };

  vm.deleteObjetivo = function (id, index) {
    ObjetivoService.deleteResource(id)
      .then(function(data) {
        vm.removeObjetivos(index);
        toastr.success(data.data.message, 'Estado!');
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeObjetivos = function (index) {
    vm.objetivos.splice(index, 1);
  };
};