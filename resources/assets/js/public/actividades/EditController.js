module.exports = function (actividad ,hitos ,unidades, ActividadService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Editar';
  vm.data = actividad;
  vm.errors = {};
  vm.formIsSubmit = false;

  console.log("data:", vm.data);
  vm.hitos = hitos;
  vm.unidades = unidades;

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

    ActividadService.updateResource(vm.getId(), vm.data)
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

  this.getId = function () {
    return $stateParams.id;
  };
};