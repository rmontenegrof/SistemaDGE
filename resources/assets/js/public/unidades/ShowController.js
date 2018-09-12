module.exports = function (unidad, UnidadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Ver';
  vm.unidad = unidad;

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
    vm.zonas.splice(index, 1);
  };
};