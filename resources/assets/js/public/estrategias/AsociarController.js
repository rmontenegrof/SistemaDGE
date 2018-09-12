module.exports = function (estrategia, iniciativas, EstrategiaService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Asociar';
  vm.data = estrategia;
  vm.id = vm.data.id_estrategia;
  vm.data.id = vm.data.id_estrategia;
  vm.iniciativas = iniciativas;
  vm.errors = {};
  vm.formIsSubmit = false;

  inicializar();
  console.log("data: ", vm.data);

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;
    EstrategiaService.asociar_iniciativas(vm.data)
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

  function inicializar(){
    var x = [];
    for (var i = estrategia.iniciativas.length - 1; i >= 0; i--) {
      x.push({ id_iniciativa: estrategia.iniciativas[i].iniciativa.id_iniciativa,
        descripcion_corta: estrategia.iniciativas[i].iniciativa.descripcion_corta});
    }
    vm.data.iniciativas = x; 
  }
};