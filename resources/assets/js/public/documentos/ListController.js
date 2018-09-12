module.exports = function (
  documentos,
  toastr,
  Confirm,
  DocumentoService,
  $window,
  $state,
  $stateParams,
  $uibModal,
  $rootScope) {
  'ngInject';
  var vm = this;

  vm.documentos = documentos.data;
  vm.totalItems = documentos.total;
  vm.itemsPerPage = documentos.per_page;
  vm.search = $stateParams;
  vm.search.page = documentos.current_page;
  vm.reload = false;

  vm.filter = function () {
    $state.go('.', vm.search, {reload: true});
    vm.reload = true;
  };

  vm.modalCrearArchivo = function() {
    $uibModal.open({
      template: require('./views/form.html'),
      controller: require('./CreateController'),
      controllerAs: 'vm'
    }).result.then(function(data) {
      vm.filter();
    }, function() {
      return false;
    });
  };

  vm.descargar = function(filename, path) {
    $window.open(path+filename, '_blank');
  };

  vm.destroy = function (id, index) {
    Confirm.destroy(function() {
      vm.deleteObjeto(id, index);
    });
  };

  vm.deleteObjeto = function (id, index) {
    DocumentoService.deleteResource(id)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        vm.removeFromList(index);
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      });
  };

  vm.removeFromList = function (index) {
    vm.documentos.splice(index, 1);
  };
};
