module.exports = function (
  $uibModalInstance,
  DocumentoIniciativaService,
  Upload,
  $state,
  $stateParams,
  toastr) {
  'ngInject';
  var vm = this;

  vm.errors = {};
  vm.formIsSubmit = false;
  vm.action = 'Cargar';
  vm.data = {
    file: null,
    id_iniciativa_file: $stateParams.id
  };

  vm.submitForm = function () {
    vm.formIsSubmit = true;
    console.log('submitForm');
    DocumentoIniciativaService.setIniciativa($stateParams.id);
    Upload.upload({
      url: DocumentoIniciativaService.getUploadRoute(),
      data: vm.data,
      method: 'POST'
    })
    .then(function(response) {
      toastr.success(response.data.message, 'Estado!');
      $uibModalInstance.close('closed');
    })
    .catch(function(err) {
      if (err.data.error) {
        toastr.error(err.data.error, 'Error');
        $uibModalInstance.close('closed');
      } else {
        vm.errors = err.data;
      }
    })
    .finally(function() {
      vm.formIsSubmit = false;
    });
  };

  vm.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function agnos(){
    var array = [];
    var thisYear = (new Date()).getFullYear();
    for (var i = 2014; i<=thisYear; i++) {
      array.push({id: i, name: i});
    }
    return array;
  }

  vm.showFechaAsociadaForm = function() {
    return vm.data.tipo_archivo!='unidades' && vm.data.tipo_archivo!='tipo_atencion';
  };

  vm.showMesAsociado = function() {
    return vm.data.tipo_archivo!='capacitaciones' && vm.data.tipo_archivo!='tercer_turno' &&
      vm.data.tipo_archivo!='cuarto_turno';
  };
};
