module.exports = function (
  element,
  type,
  $uibModalInstance,
  $state,
  $stateParams,
  toastr) {
  'ngInject';
  var vm = this;

  vm.element = element;
  vm.type = type;
  vm.nombre = (type==0)?'Iniciativa':'Hito';
  vm.mostrar = (type==0)?false:true;

  vm.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };

};
