module.exports = function ( estrategia, EstrategiaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = estrategia;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesEstado = [
    {id: 1, nombre: "Activo"},
    {id: 0, nombre: "Inactivo"}
  ];
  vm.opcionesEditable = [
    {id: 1, nombre: "Si"},
    {id: 0, nombre: "No"}
  ];

  console.log('Estrategia:', estrategia);

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    EstrategiaService.updateResource(vm.getId(), vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.estrategias', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };

  this.getId = function () {
    return $stateParams.id;
  };
};