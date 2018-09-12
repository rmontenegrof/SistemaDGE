module.exports = function (objetivos, unidades, focos, ObjetivoService, $state, toastr, $uibModal) {
  'ngInject';
	var vm = this;
  vm.data = {
    unidad: '',
    foco: ''
  };
	vm.objetivos = objetivos;
  vm.unidades  = unidades;
  vm.focos     = [];
  vm.errors = {};
	vm.showPanel    = false;
	vm.formIsSubmit = false;
  vm.lista_objetivos = [];
  vm.oneAtATime = false;

  //console.log("focos:", vm.focos);
  //console.log("unidades", vm.unidades);

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.setPanel = function() {
    vm.showPanel = true;
  };

  vm.focoType = function() {
    var seleccionada = vm.data.unidad;
    var focos_posee = [];
    var focos_formateado = [];
    for (var i = 0; i < seleccionada.objetivos.length; i++) {
      if (!focos_posee.includes(seleccionada.objetivos[i].foco.descripcion_foco) ) {
        focos_posee.push(seleccionada.objetivos[i].foco.descripcion_foco);
        focos_formateado.push(seleccionada.objetivos[i].foco);
      }
    }
    vm.focos = focos_formateado;
    vm.formatear();
  }

  vm.formatear = function() {
    vm.showPanel = true;
    var tipo_foco = vm.data.foco.descripcion_foco;
    vm.titulo_panel = vm.data.unidad.unidad;
    for (var i = 0; i < vm.data.unidad.objetivos.length; i++) {
      if( vm.data.unidad.objetivos[i].foco.descripcion_foco == tipo_foco) {
        vm.data.unidad.objetivos[i].mostrar = true;
      } else {
        vm.data.unidad.objetivos[i].mostrar = false;
      }
    }
  }

  vm.modalAgregarArchivo = function(id) {
    $uibModal.open({
      template: require('./views/formArchivo.html'),
      controller: require('./CreateArchivoController'),
      controllerAs: 'vm',
      resolve: {
        id_iniciativa: id
      }
    }).result.then(function(data) {

    }, function() {
      return false;
    });
  };
}
