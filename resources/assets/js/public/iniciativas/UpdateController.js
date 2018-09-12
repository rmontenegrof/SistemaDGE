module.exports = function (iniciativa ,unidades, origenes ,IniciativaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Actualizar';
  vm.data = iniciativa;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.unidades = unidades;
  vm.origenes = origenes;

  console.log(iniciativa);
  vm.opcionesActivo = [
    {id: 1, nombre: 'Activo'},
    {id: 0, nombre: 'Inactivo'}
  ];

  vm.opcionesTipo = [
    {id: 1, nombre: 'Acción'},
    {id: 0, nombre: 'Hito'}
  ];

  vm.opcionesSemestre = [
    {id: 1, nombre: 'Primer Semestre'},
    {id: 2, nombre: 'Segundo Semestre'}
  ];

   vm.opcionesAvance = [
    {id: 1, nombre: 'No Iniciada'},
    {id: 2, nombre: 'En Curso'},
    {id: 3, nombre: 'Terminada'}
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
    IniciativaService.updateResource(vm.getId(),vm.data)
      .then(function(data) {
        toastr.success(data.data.message, 'Estado!');
        $state.go('app.queryIniciativas', {}, {reload: true});
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