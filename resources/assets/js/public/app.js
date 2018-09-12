window._ = require('lodash');
window.$ = window.jQuery = require('jquery');
// En caso de guardar archivo desde servidor (Ejemplo: PDF generado desde Laravel)
// window.FileSaver = require('file-saver');

// En caso de usar datatable
// require( 'datatables.net' )( window, $ );
// require( 'datatables.net-bs' )( window, $ );
// require( 'datatables.net-buttons' )( window, $ );
// require( 'datatables.net-buttons/js/buttons.colVis.js' )(window, $);
// require( 'datatables.net-buttons/js/buttons.flash.js' )(window, $);
// require( 'datatables.net-buttons/js/buttons.html5.js' )(window, $);
// require( 'datatables.net-buttons/js/buttons.print.js' )(window, $);
// require('./../../../../node_modules/angular-datatables/vendor/datatables-columnfilter/js/dataTables.columnFilter.js');

require('./layout/nav.js')
require('angular');
require('bootstrap-sass');
require('angular-acl');
require('angular-animate');
//require('angular-datatables');
require('angular-messages');
require('angular-loading-bar');
require('angular-sanitize');
require('angular-sweetalert');
require('angular-ui-bootstrap');
require('angular-ui-router');
require('angular-toastr');

// Subir archivo
// window.Dropzone = require('dropzone');
// require('ngdropzone');
require('ng-file-upload');
require('satellizer');
require('sweetalert');
require('ui-select');

angular.module('app', [
  'angular-loading-bar',
	// 'datatables',
	// 'datatables.bootstrap',
	// 'datatables.columnfilter',
	// 'datatables.buttons',
  'ngAnimate',
  'ngMessages',
  'ngSanitize',
  'mm.acl',
  'oitozero.ngSweetAlert',
  'satellizer',
  'ngFileUpload',
  //'thatisuday.dropzone',
  'toastr',
  'ui.bootstrap',
  'ui.router',
  'ui.select',
])
.run(function($rootScope, $log, $auth, $state, toastr) {

  // Configurar datatable
  // DTDefaultOptions.setLanguage({
  //   sUrl: "/i18n/datatable.json",
  // });
  // DTDefaultOptions.setLoadingTemplate('<div class="text-center"><i class="fa fa-refresh fa-spin fa-4x fa-fw"></i> <span class="sr-only">Cargando ...</span></div>');

  // error manage
	$rootScope.$on('$stateChangeError',
		function(event, toState, toParams, fromState, fromParams, error) {
      if(error === 'Unauthorized'){
        $state.go('app.profile');
        return;
      }
      if (error.status == 401) {
        $auth.removeToken();
        toastr.error(error.data.error, 'Estado!');
        $state.go('login');
      }
			$log.error('error', error);
		});
})
.config(require('./routes.js'))
.config(function($authProvider, uibPaginationConfig) {
	$authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';
  uibPaginationConfig.previousText = 'Previo';
  uibPaginationConfig.nextText = 'Siguiente';
})
// .config(function(dropzoneOpsProvider){
//     dropzoneOpsProvider.setOptions({
//         url : '/',
//     });
// })
.directive('toggleShortcut', require('./directives/toggleShortcut'))
.directive('smartMenu', require('./directives/smartMenu'))
.directive('stateBreadcrumbs', require('./directives/stateBreadcrumbs'))
.directive('ngEnter', require('./directives/NgEnter'))
.directive('notificationsToggle', require('./directives/notificationsToggle'))
.filter('isEmpty', require('./filters/IsEmpty'))
.controller('NavBarController', require('./app/NavBarController'))
.service('ApiService', require('./services/ApiService'))
.service('Confirm', require('./services/Confirm'))
.service('UserService', require('./users/UserService'))
.service('UnidadService', require('./unidades/UnidadService'))
.service('PeriodoService', require('./periodos/PeriodoService'))
.service('FocoService', require('./focos/FocoService'))
.service('GrupoService', require('./grupos/GrupoService'))
.service('IniciativaService', require('./iniciativas/IniciativaService'))
.service('ObjetivoService', require('./objetivos/ObjetivoService'))
.service('UnidadApoyoService', require('./unidades_apoyo/UnidadApoyoService'))
.service('EstrategiaService', require('./estrategias/EstrategiaService'))
.service('ActividadService', require('./actividades/ActividadService'))
.service('OrigenIniciativaService', require('./origen_iniciativas/OrigenIniciativaService'))
.service('HitoService', require('./hitos/HitoService'))
.service('DocumentoService', require('./documentos/DocumentoService'))
.service('DocumentoIniciativaService', require('./documentos_iniciativa/DocumentoIniciativaService'))
.service('ProyectoService', require('./proyectos/iniciativas/ProyectoService'))
.service('ProyectoObjetivoService', require('./proyectos/objetivos/ProyectoObjetivoService'))
.service('ProyectoEstrategiaService', require('./proyectos/estrategias/ProyectoEstrategiaService'))
.service('ProyectoHitoService', require('./proyectos/hitos/ProyectoHitoService'))
.service('ProyectoActividadService', require('./proyectos/actividades/ProyectoActividadService'))















