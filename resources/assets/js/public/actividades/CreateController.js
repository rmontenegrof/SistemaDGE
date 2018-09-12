module.exports = function (hitos ,unidades ,ActividadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Crear';
  vm.data = {
  };
  vm.errors = {};
  vm.formIsSubmit = false;

  vm.hitos    = hitos;
  vm.unidades = unidades;

  console.log("unidades: ", vm.unidades);

  vm.opcionesSemestre = [
    {id: 1, nombre: 'Primer Semestre'},
    {id: 2, nombre: 'Segundo Semestre'}
  ];

  vm.meses = [
    {id: 1, nombre: "Enero"},
    {id: 2, nombre: "Febrero"},
    {id: 3, nombre: "Marzo"},
    {id: 4, nombre: "Abril"},
    {id: 5, nombre: "Mayo"},
    {id: 6, nombre: "Junio"},
    {id: 7, nombre: "Julio"},
    {id: 8, nombre: "Agosto"},
    {id: 9, nombre: "Septiembre"},
    {id: 10, nombre: "Octubre"},
    {id: 11, nombre: "Noviembre"},
    {id: 12, nombre: "Diciembre"}
  ];

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;

    ActividadService.createResource(vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.actividades', {}, {reload: true});
      })
      .catch(function(errors) {
        vm.errors = errors.data;
      }).finally(function() {
        vm.formIsSubmit = false;
      });
  };
};