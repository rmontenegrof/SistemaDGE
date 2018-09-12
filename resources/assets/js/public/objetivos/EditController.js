module.exports = function (objetivo, focos, unidades, periodos, ObjetivoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = objetivo;
  vm.errors = {};
  vm.focos = focos;
  vm.unidades = unidades;
  vm.periodos = periodos;
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

    ObjetivoService.updateResource(vm.getId(),vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.objetivos', {}, {reload: true});
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