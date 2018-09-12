module.exports = function (periodos, unidades, ObjetivoService, $state, toastr, $uibModal) {
  'ngInject';
	var vm = this;
  vm.data = {
    unidad: ''
  };
  vm.unidades  = unidades;
  vm.periodos = periodos;
  vm.errors = {};
	vm.showPanel    = false;
	vm.formIsSubmit = false;
  vm.lista_objetivos = [];
  vm.oneAtATime = false;
  vm.per_f = [];
  vm.anhos = [];

  console.log("Unidades:", vm.unidades);

  this.hasError = function(property) {
    return vm.errors.hasOwnProperty(property);
  };

  this.setPanel = function() {
    vm.showPanel = true;
  };

  vm.focoType = function() {
    var seleccionada = vm.data.unidad;
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
    vm.titulo_panel = vm.data.unidad.unidad;
    vm.iniciativas = [];
    vm.hitos = [];
    //console.log(vm.data.unidad);
    for (var objetivo of vm.data.unidad.objetivos) {
      //console.log('Objetivo:',objetivo);
      for (var estrategia of objetivo.estrategias) {
        //console.log('Estrategia:', estrategia);
        if(estrategia.estrategia) {
          for (var iniciativa of estrategia.estrategia.iniciativas) {
            //console.log('Iniciativa', iniciativa);
            if (iniciativa.iniciativa) {
              if (iniciativa.iniciativa.anho_inicio >= vm.data.periodo.anho_inicio && iniciativa.iniciativa.anho_inicio <= vm.data.periodo.anho_fin) {
                for (var hito of iniciativa.iniciativa.hitos) {
                  //console.log('Hito', hito);
                  if (!vm.hitos[hito.id_hito]) {
                    vm.hitos[hito.id_hito] = Object.assign({}, hito, {});
                  }
                }
                if (!vm.iniciativas[iniciativa.iniciativa.id_iniciativa]) {
                  vm.iniciativas[iniciativa.iniciativa.id_iniciativa] = Object.assign({}, iniciativa.iniciativa, {});
                }
              }
            }
          }
        }
      }
    }
  }

  vm.modalVer = function(el, type) {
    $uibModal.open({
      template: require('./views/show.html'),
      controller: require('./ShowController'),
      controllerAs: 'vm',
      resolve: {
        element: el,
        type: type
      }
    }).result.then(function(data) {

    }, function() {
      return false;
    });
  };

  vm.agnosFormat = function() {
    var init = vm.data.periodo.anho_inicio;
    var fin = vm.data.periodo.anho_fin;
    var periodos = [];
    var anhos = [];

    for (var i = init; i <= fin ; i++) {
      periodos = periodos.concat([1,2]);
      anhos.push(i);
    }

    vm.per_f = periodos;
    vm.anhos = anhos;
  }

  vm.mostrarIniciativa = function(index, semestre, iniciativa) {

    var semestre = semestre;
    var largo = parseInt(iniciativa.semestre_fin) - parseInt(iniciativa.semestre_inicio) + (parseInt(iniciativa.anho_fin) - parseInt(iniciativa.anho_inicio))*2;
    //console.log('entré: ', (vm.per_f.length - semestre - largo));
    return (vm.per_f.length - semestre - largo);
  }

  vm.span = function(index, semestre, iniciativa) {
    var agno = vm.anhos[Math.floor(semestre/2)];
    //console.log('semestre:', semestre,' index:',index, 'agno:', agno);
    if (parseInt(iniciativa.semestre_inicio)!=index || agno!= parseInt(iniciativa.anho_inicio)) {
      return 1;
    }
    var largo = parseInt(iniciativa.semestre_fin) - parseInt(iniciativa.semestre_inicio) + (parseInt(iniciativa.anho_fin) - parseInt(iniciativa.anho_inicio))*2;
    return largo+1; 
  }

  vm.barra = function(elemento, semestre, iniciativa) {
    var agno = vm.anhos[Math.floor(semestre/2)];
    if (parseInt(iniciativa.semestre_inicio)==elemento && agno== parseInt(iniciativa.anho_inicio)) {
      
      return false;
    }
    return true;
  }

  vm.mostrarHito = function(elemento, semestre, hito) {
    var agno = vm.anhos[Math.floor(semestre/2)];
    var agno_max = 0;
    var mes_max = 0;
    var estado = true;
    if(hito) {
      for (var i = hito.actividades.length - 1; i >= 0; i--) {
        if (hito.actividades[i].anho_termino >= agno_max) {
          agno_max = hito.actividades[i].anho_termino;
          if (mes_max <= hito.actividades[i].mes_termino) {
            mes_max = hito.actividades[i].mes_termino;
          }
        }
      }
    }
    var semestre = (mes_max > 6)?2:1;
    if (semestre==elemento && agno== agno_max) {
      return false;
    }
    return true;
  }

  vm.iconoHito = function(hito){
    for (var i = hito.actividades.length - 1; i >= 0; i--) {
      if(hito.actividades[i].avance != 100) {
        return 'ban';
      }
    }

    return 'check';
  }
}
