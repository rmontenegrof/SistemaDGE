module.exports = function (unidades, UnidadService, $state, toastr) {
  'ngInject';
	var vm = this;
  vm.data = {};
	vm.unidades = unidades.data;
  vm.errors = {};
	vm.showPanelPassword = false;
	vm.formIsSubmit = false;

  //console.log(vm.unidades);
  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.setPanel = function(unidad){
    
  };
}
