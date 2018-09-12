module.exports = function (iniciativas, IniciativaService, toastr, Confirm, $state, $stateParams) {
  'ngInject';
  var vm = this;
  vm.iniciativas = iniciativas.data;
  vm.totalItems = iniciativas.total;
  vm.itemsPerPage = iniciativas.per_page;
  vm.search = $stateParams;
  vm.search.page = iniciativas.current_page;
  vm.reload = false;

  vm.opcionesAvance = [
    {id: 1, nombre: 'No inciada'},
    {id: 2, nombre: 'En curso'},
    {id: 3, nombre: 'Terminada'}
  ];

  vm.filter = function () {
    console.log('search: ', vm.search);
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteResource(id, index);
    });
  };

  vm.deleteResource = function (id, index) {
    IniciativaService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromArray(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromArray = function (index) {
    vm.iniciativas.splice(index, 1);
  };
};