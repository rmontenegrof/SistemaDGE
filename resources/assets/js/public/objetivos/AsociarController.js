module.exports = function (objetivo, estrategias, ObjetivoService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Asociar';
  vm.data = objetivo;
  vm.id = vm.data.id_objetivo;
  vm.data.id = vm.data.id_objetivo;
  vm.estrategias = estrategias;
  vm.errors = {};
  vm.formIsSubmit = false;

 
  console.log("data:", vm.data);
  console.log("data2:", vm.id);
  inicializar();

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.submitForm = function () {
    vm.formIsSubmit = true;
    ObjetivoService.asociar_estrategias(vm.data)
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
    return vm.data.id_objetivo;
  };

  function inicializar(){
    var x = [];
    for (var i = objetivo.estrategias.length - 1; i >= 0; i--) {
      x.push({ id_estrategia: objetivo.estrategias[i].estrategia.id_estrategia,
        estrategia: objetivo.estrategias[i].estrategia.estrategia});
    }
    vm.data.estrategias = x; 
  }
};