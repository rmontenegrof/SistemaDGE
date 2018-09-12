module.exports = function (iniciativas, HitoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {
  };
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.iniciativas = iniciativas;
  
  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  vm.opcionesSemestre = [
    {id: 1, nombre: 'Primer Semestre'},
    {id: 2, nombre: 'Segundo Semestre'}
  ];

  this.submitForm = function () {
    vm.formIsSubmit = true;

    HitoService.createResource(vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.hitos', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };
};