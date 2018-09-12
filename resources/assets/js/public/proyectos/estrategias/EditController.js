module.exports = function (estrategia, objetivos, ProyectoEstrategiaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = estrategia;
  vm.errors = {};
  vm.objetivos = objetivos;
  vm.formIsSubmit = false;

  vm.opcionesEstado = [
    {id: 1, nombre: "Activo"},
    {id: 0, nombre: "Inactivo"}
  ];

  console.log("data:", vm.data );

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ProyectoEstrategiaService.updateResource(vm.getId(),vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.estrategias2', {}, {reload: true});
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