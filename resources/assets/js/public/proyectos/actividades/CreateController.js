module.exports = function (hitos, unidades, ProyectoActividadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {
  };
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesEstado = [
    {id: 1, nombre: "Activo"},
    {id: 0, nombre: "Inactivo"}
  ];

  vm.hitos = hitos;
  vm.unidades = unidades;

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ProyectoActividadService.createResource(vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.actividades2', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };
};