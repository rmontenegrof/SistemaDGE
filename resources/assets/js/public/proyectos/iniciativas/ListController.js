module.exports = function (proyectos, ProyectoService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.proyectos = proyectos.data;
  vm.totalItems = proyectos.total;
  vm.itemsPerPage = proyectos.per_page;
  vm.search = $stateParams;
  vm.search.page = proyectos.current_page;
  vm.reload = false;

  console.log("data", vm.proyectos);
  
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
    ProyectoService.deleteResource(id)
      .then(function(data) {
        vm.removeProyecto(index);
        toastr.success(data.data.message, 'Estado!');
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeProyecto = function (index) {
    vm.proyectos.splice(index, 1);
  };
};