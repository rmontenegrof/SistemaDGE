module.exports = function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

    /**
     * Helper auth functions
     */
  var skipIfLoggedIn = function($q, $auth, $location) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      $location.path('/home');
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  };

  $stateProvider
  // auth
    .state('login', {
      url: '/login',
      controller: require('./auth/LoginController'),
      controllerAs: 'vm',
      template: require('./auth/login.html'),
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })

    .state('logout', {
      url: '/logout',
      controller: require('./auth/LogoutController'),
      template: '<div></div>'
    })

    .state('register', {
      url: '/register',
      controller: require('./auth/RegisterController'),
      controllerAs: 'vm',
      template: require('./auth/register.html'),
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })

  // application
    .state('app', {
      abstract: true,
      template: require('./layout/layout.html'),
      controller: function(user, AclService) {
        this.hasRole = AclService.hasRole;
        this.user = user;
        this.notificationsSize = _.size(user.notifications);
        this.unreadNotificationsSize = _.size(_.filter(user.notifications, function(n) {
          return ! n.read_at;
        }));
        this.isAdmin = function(){
          return (this.user.tipo==3) ? true : false;
        };
      },
      controllerAs: 'vm',
      resolve: {
        user: function(UserService, AclService, toastr, $auth, $state) {
          if (window.currentUser) {
            return window.currentUser;
          }
          // attach roles and user
          return UserService.me().then((data) => {
            _.flatMap(_.flatMap(data.data.roles), 'name').forEach(function(rol) {
              AclService.attachRole(rol);
            });
            window.currentUser = data.data;
            return data.data;
          }, (error) => {
            window.currentUser = null;
            $auth.removeToken();
            toastr.error(error.data.error, 'Estado!');
            $state.go('login');
          });
          return window.currentUser;
        }
      }
    })

    //users
    .state('app.users', {
      url: '/users?page&usuario&unidad&nombre',
      controller: require('./users/ListController'),
      controllerAs: 'vm',
      template: require('./users/views/index.html'),
      resolve: {
        users: function(UserService, $stateParams) {
          return UserService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'users'
      }
    })
    .state('app.users.create', {
      url: '/crear',
      controller: require('./users/CreateController'),
      controllerAs: 'vm',
      template: require('./users/views/form.html'),
      resolve: {
        unidades: function(UnidadService, $stateParams){
          return UnidadService.all($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.users.show', {
      url: '/ver/:id',
      controller: require('./users/ShowController'),
      controllerAs: 'vm',
      template: require('./users/views/show.html'),
      resolve: {
        usuario: function(UserService, $stateParams) {
          return UserService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.users.edit', {
      url: '/editar/:id',
      controller: require('./users/EditController'),
      controllerAs: 'vm',
      template: require('./users/views/form.html'),
      resolve: {
        usuario: function(UserService, $stateParams) {
          return UserService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService, $stateParams){
          return UnidadService.all($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })

    .state('app.home', {
      url: '/home',
      controller: function($auth, data) {
        this.isAuthenticated = $auth.isAuthenticated;
        this.data = data;
      },
      controllerAs: 'vm',
      data: {
        title: 'Inicio'
      },
      template: require('./app/index.html'),
      resolve: {
        data: function($http) {
          return [];
          // return $http.get('/api/dashboard').then(function(data) {
          //   return data.data;
          // });
        }
      }
    })

    .state('app.profile', {
      url: '/profile',
      controller: require('./profile/ProfileController'),
      controllerAs: 'vm',
      template: require('./profile/form.html'),
      data: {
        title: 'Perfil'
      }
    })


    .state('app.iframe', {
      url: '/Indicadores',
      controller: require('./iframe_indicadores/IframeController'),
      controllerAs: 'vm',
      template: require('./iframe_indicadores/form.html'),
      data: {
        title: 'Indicadores'
      }
    })


    .state('app.unidades', {
      url: '/unidades?page&unidad&estado',
      controller: require('./unidades/ListController'),
      controllerAs: 'vm',
      template: require('./unidades/views/index.html'),
      resolve: {
        unidades: function(UnidadService, $stateParams) {
          return UnidadService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Unidades'
      }
    })
    .state('app.unidades.create', {
      url: '/crear',
      controller: require('./unidades/CreateController'),
      controllerAs: 'vm',
      template: require('./unidades/views/form.html'),
      resolve: {
        grupos: function(GrupoService, $stateParams) {
          return GrupoService.getAll().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.unidades.show', {
      url: '/ver/:id',
      controller: require('./unidades/ShowController'),
      controllerAs: 'vm',
      template: require('./unidades/views/show.html'),
      resolve: {
        unidad: function(UnidadService, $stateParams) {
          return UnidadService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.unidades.edit', {
      url: '/editar/:id',
      controller: require('./unidades/EditController'),
      controllerAs: 'vm',
      template: require('./unidades/views/form.html'),
      resolve: {
        unidad: function(UnidadService, $stateParams) {
          return UnidadService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        grupos: function(GrupoService, $stateParams) {
          return GrupoService.getAll().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    //Periodos
    .state('app.periodos', {
      url: '/periodos?page&periodo&estado',
      controller: require('./periodos/ListController'),
      controllerAs: 'vm',
      template: require('./periodos/views/index.html'),
      resolve: {
        periodos: function(PeriodoService, $stateParams) {
          return PeriodoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Periodos'
      }
    })
    .state('app.periodos.create', {
      url: '/crear',
      controller: require('./periodos/CreateController'),
      controllerAs: 'vm',
      template: require('./periodos/views/form.html'),
      resolve: {},
      data: {
        title: 'Crear'
      }
    })
    .state('app.periodos.show', {
      url: '/ver/:id',
      controller: require('./periodos/ShowController'),
      controllerAs: 'vm',
      template: require('./periodos/views/show.html'),
      resolve: {
        periodo: function(PeriodoService, $stateParams) {
          return PeriodoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.periodos.edit', {
      url: '/editar/:id',
      controller: require('./periodos/EditController'),
      controllerAs: 'vm',
      template: require('./periodos/views/form.html'),
      resolve: {
        periodo: function(PeriodoService, $stateParams) {
          return PeriodoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    //Focos
    .state('app.focos', {
      url: '/focos?page&foco&estado',
      controller: require('./focos/ListController'),
      controllerAs: 'vm',
      template: require('./focos/views/index.html'),
      resolve: {
        focos: function(FocoService, $stateParams) {
          return FocoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'focos'
      }
    })
    .state('app.focos.create', {
      url: '/crear',
      controller: require('./focos/CreateController'),
      controllerAs: 'vm',
      template: require('./focos/views/form.html'),
      resolve: {},
      data: {
        title: 'Crear'
      }
    })
    .state('app.focos.show', {
      url: '/ver/:id',
      controller: require('./focos/ShowController'),
      controllerAs: 'vm',
      template: require('./focos/views/show.html'),
      resolve: {
        foco: function(FocoService, $stateParams) {
          return FocoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.focos.edit', {
      url: '/editar/:id',
      controller: require('./focos/EditController'),
      controllerAs: 'vm',
      template: require('./focos/views/form.html'),
      resolve: {
        foco: function(FocoService, $stateParams) {
          return FocoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })

    //Objetivos
    .state('app.objetivos', {
      url: '/objetivos?page&objetivo&estado&unidad',
      controller: require('./objetivos/ListController'),
      controllerAs: 'vm',
      template: require('./objetivos/views/index.html'),
      resolve: {
        objetivos: function(ObjetivoService, $stateParams) {
          return ObjetivoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Objetivos'
      }
    })
    .state('app.objetivos.create', {
      url: '/crear',
      controller: require('./objetivos/CreateController'),
      controllerAs: 'vm',
      template: require('./objetivos/views/form.html'),
      resolve: {
        focos: function(FocoService, $stateParams) {
          return FocoService.all($stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService, $stateParams){
          return UnidadService.all($stateParams).then(function(data) {
            return data.data;
          });
        },
        periodos: function(PeriodoService, $stateParams){
          return PeriodoService.all($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.objetivos.show', {
      url: '/ver/:id',
      controller: require('./objetivos/ShowController'),
      controllerAs: 'vm',
      template: require('./objetivos/views/show.html'),
      resolve: {
        objetivo: function(ObjetivoService, $stateParams) {
          return ObjetivoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.objetivos.asociar', {
      url: '/asociar/:id',
      controller: require('./objetivos/AsociarController'),
      controllerAs: 'vm',
      template: require('./objetivos/views/asociar.html'),
      resolve: {
        objetivo: function(ObjetivoService, $stateParams) {
          return ObjetivoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        estrategias: function(EstrategiaService, $stateParams) {
          return EstrategiaService.all().then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.objetivos.edit', {
      url: '/editar/:id',
      controller: require('./objetivos/EditController'),
      controllerAs: 'vm',
      template: require('./objetivos/views/form.html'),
      resolve: {
        objetivo: function(ObjetivoService, $stateParams) {
          return ObjetivoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        focos: function(FocoService, $stateParams) {
          return FocoService.all($stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService, $stateParams){
          return UnidadService.all($stateParams).then(function(data) {
            return data.data;
          });
        },
        periodos: function(PeriodoService, $stateParams){
          return PeriodoService.all($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.estrategias', {
      url: '/estrategias?page&estrategia&unidad&objetivo&estado',
      controller: require('./estrategias/ListController'),
      controllerAs: 'vm',
      template: require('./estrategias/views/index.html'),
      resolve: {
        estrategias: function(EstrategiaService, $stateParams) {
          return EstrategiaService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Estrategias'
      }
    })
    .state('app.estrategias.create', {
      url: '/crear',
      controller: require('./estrategias/CreateController'),
      controllerAs: 'vm',
      template: require('./estrategias/views/form.html'),
      resolve: {},
      data: {
        title: 'Crear'
      }
    })
    .state('app.estrategias.show', {
      url: '/ver/:id',
      controller: require('./estrategias/ShowController'),
      controllerAs: 'vm',
      template: require('./estrategias/views/show.html'),
      resolve: {
        estrategia: function(EstrategiaService, $stateParams) {
          return EstrategiaService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.estrategias.asociar', {
      url: '/asociar/:id',
      controller: require('./estrategias/AsociarController'),
      controllerAs: 'vm',
      template: require('./estrategias/views/asociar.html'),
      resolve: {
        estrategia: function(EstrategiaService, $stateParams) {
          return EstrategiaService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        iniciativas: function(IniciativaService, $stateParams) {
          return IniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.estrategias.edit', {
      url: '/editar/:id',
      controller: require('./estrategias/EditController'),
      controllerAs: 'vm',
      template: require('./estrategias/views/form.html'),
      resolve: {
        estrategia: function(EstrategiaService, $stateParams) {
          return EstrategiaService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.iniciativas', {
      url: '/iniciativas?page&iniciativa&estadoAvance&estrategia&unidad',
      controller: require('./iniciativas/ListController'),
      controllerAs: 'vm',
      template: require('./iniciativas/views/index.html'),
      resolve: {
        iniciativas: function(IniciativaService, $stateParams) {
          return IniciativaService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Iniciativas'
      }
    })
    .state('app.iniciativas.create', {
      url: '/crear',
      controller: require('./iniciativas/CreateController'),
      controllerAs: 'vm',
      template: require('./iniciativas/views/form.html'),
      resolve: {
        unidades: function(UnidadApoyoService){
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        },
        origenes: function(OrigenIniciativaService){
          return OrigenIniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.iniciativas.show', {
      url: '/ver/:id',
      controller: require('./iniciativas/ShowController'),
      controllerAs: 'vm',
      template: require('./iniciativas/views/show.html'),
      resolve: {
        iniciativa: function(IniciativaService, $stateParams) {
          return IniciativaService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadApoyoService){
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.iniciativas.show.archivos', {
      url: '/documentos',
      controller: require('./documentos_iniciativa/ListController'),
      controllerAs: 'vm',
      template: require('./documentos_iniciativa/views/index.html'),
      resolve: {
        documentos: function(DocumentoIniciativaService, iniciativa, $stateParams) {
          DocumentoIniciativaService.setIniciativa(iniciativa.id_iniciativa);
          return DocumentoIniciativaService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.iniciativas.edit', {
      url: '/editar/:id',
      controller: require('./iniciativas/EditController'),
      controllerAs: 'vm',
      template: require('./iniciativas/views/form.html'),
      resolve: {
        iniciativa: function(IniciativaService, $stateParams) {
          return IniciativaService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadApoyoService){
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        },
        origenes: function(OrigenIniciativaService){
          return OrigenIniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.iniciativas.edit_update', {
      url: '/actualizar/:id',
      controller: require('./iniciativas/UpdateController'),
      controllerAs: 'vm',
      template: require('./iniciativas/views/formUpdate.html'),
      resolve: {
        iniciativa: function(IniciativaService, $stateParams) {
          return IniciativaService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadApoyoService){
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        },
        origenes: function(OrigenIniciativaService){
          return OrigenIniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Actualizar'
      }
    })
    .state('app.panel', {
      url: '/consulta/panel',
      controller: require('./panel/PanelController'),
      controllerAs: 'vm',
      template: require('./panel/views/PanelForm.html'),
      resolve: {
        objetivos: function(ObjetivoService, $stateParams) {
          return ObjetivoService.panel_acciones($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Panel de Control'
      }
    })
    .state('app.queryIniciativas', {
      url: '/consulta/iniciativas',
      controller: require('./panel/IniciativasController'),
      controllerAs: 'vm',
      template: require('./panel/views/IniciativasForm.html'),
      resolve: {
        objetivos: function(ObjetivoService, $stateParams) {
          return ObjetivoService.panel_acciones($stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService, $stateParams) {
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        },
        focos: function(FocoService, $stateParams) {
          return FocoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Consulta Iniciativas'
      }
    })
    .state('app.comunicar', {
      url: '/enviar/comunicado',
      controller: require('./panel/ComunicarController'),
      controllerAs: 'vm',
      template: require('./panel/views/ComunicarForm.html'),
      resolve: {
        unidades: function(UnidadService, $stateParams) {
          return UnidadService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Envío de comunicado'
      }
    })
    .state('app.actividades', {
      url: '/actividades?page&actividad&origen&responsable&iniciativa',
      controller: require('./actividades/ListController'),
      controllerAs: 'vm',
      template: require('./actividades/views/index.html'),
      resolve: {
        actividades: function(ActividadService, $stateParams) {
          return ActividadService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Actividades'
      }
    })
    .state('app.actividades.create', {
      url: '/crear',
      controller: require('./actividades/CreateController'),
      controllerAs: 'vm',
      template: require('./actividades/views/form.html'),
      resolve: {
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        },
        hitos: function(HitoService){
          return HitoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.actividades.show', {
      url: '/ver/:id',
      controller: require('./actividades/ShowController'),
      controllerAs: 'vm',
      template: require('./actividades/views/show.html'),
      resolve: {
        actividad: function(ActividadService, $stateParams) {
          return ActividadService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.actividades.edit', {
      url: '/editar/:id',
      controller: require('./actividades/EditController'),
      controllerAs: 'vm',
      template: require('./actividades/views/form.html'),
      resolve: {
        actividad: function(ActividadService, $stateParams) {
          return ActividadService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        },
        hitos: function(HitoService){
          return HitoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.apoyo', {
      url: '/unidades_apoyo?page',
      controller: require('./unidades_apoyo/ListController'),
      controllerAs: 'vm',
      template: require('./unidades_apoyo/views/index.html'),
      resolve: {
        unidades: function(UnidadApoyoService, $stateParams) {
          return UnidadApoyoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Unidades de Apoyo'
      }
    })
    .state('app.apoyo.create', {
      url: '/crear',
      controller: require('./unidades_apoyo/CreateController'),
      controllerAs: 'vm',
      template: require('./unidades_apoyo/views/form.html'),
      resolve: {},
      data: {
        title: 'Crear'
      }
    })
    .state('app.apoyo.edit', {
      url: '/editar/:id',
      controller: require('./unidades_apoyo/EditController'),
      controllerAs: 'vm',
      template: require('./unidades_apoyo/views/form.html'),
      resolve: {
        unidad: function(UnidadApoyoService, $stateParams) {
          return UnidadApoyoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.origen', {
      url: '/origen_iniciativas?page',
      controller: require('./origen_iniciativas/ListController'),
      controllerAs: 'vm',
      template: require('./origen_iniciativas/views/index.html'),
      resolve: {
        origenes: function(OrigenIniciativaService, $stateParams) {
          return OrigenIniciativaService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Origen Iniciativas'
      }
    })
    .state('app.origen.create', {
      url: '/crear',
      controller: require('./origen_iniciativas/CreateController'),
      controllerAs: 'vm',
      template: require('./origen_iniciativas/views/form.html'),
      resolve: {},
      data: {
        title: 'Crear'
      }
    })
    .state('app.origen.edit', {
      url: '/editar/:id',
      controller: require('./origen_iniciativas/EditController'),
      controllerAs: 'vm',
      template: require('./origen_iniciativas/views/form.html'),
      resolve: {
        origen: function(OrigenIniciativaService, $stateParams) {
          return OrigenIniciativaService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.hitos', {
      url: '/hitos?page&hito&responsable&iniciativa&medio',
      controller: require('./hitos/ListController'),
      controllerAs: 'vm',
      template: require('./hitos/views/index.html'),
      resolve: {
        hitos: function(HitoService, $stateParams) {
          return HitoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Hitos'
      }
    })
    .state('app.hitos.create', {
      url: '/crear',
      controller: require('./hitos/CreateController'),
      controllerAs: 'vm',
      template: require('./hitos/views/form.html'),
      resolve: {
        iniciativas: function(IniciativaService){
          return IniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.hitos.edit', {
      url: '/editar/:id',
      controller: require('./hitos/EditController'),
      controllerAs: 'vm',
      template: require('./hitos/views/form.html'),
      resolve: {
        hito: function(HitoService, $stateParams) {
          return HitoService.getResource($stateParams.id, $stateParams).then(function(data) {
            return data.data;
          });
        },
        iniciativas: function(IniciativaService){
          return IniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.documentos', {
      url: '/documentos',
      controller: require('./documentos/ListController'),
      controllerAs: 'vm',
      template: require('./documentos/views/index.html'),
      resolve: {
        documentos: function(DocumentoService, $stateParams) {
          return DocumentoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.proyectos', {
      url: '/proyectos',
      controller: require('./proyectos/iniciativas/ListController'),
      controllerAs: 'vm',
      template: require('./proyectos/iniciativas/views/index.html'),
      resolve: {
        proyectos: function(ProyectoService, $stateParams) {
          return ProyectoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.queryProyectos', {
      url: '/visualizacion/proyectos',
      controller: require('./proyectos/iniciativas/QueryController'),
      controllerAs: 'vm',
      template: require('./proyectos/iniciativas/views/view.html'),
      resolve: {
        proyectos: function(ProyectoService, $stateParams) {
          return ProyectoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.proyectos.edit2', {
      url: '/editar/:id',
      controller: require('./proyectos/iniciativas/QueryEditController'),
      controllerAs: 'vm',
      template: require('./proyectos/iniciativas/views/Queryform.html'),
      resolve: {
        proyecto: function(ProyectoService, $stateParams) {
          return ProyectoService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        estrategias: function(ProyectoEstrategiaService){
          return ProyectoEstrategiaService.all().then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.proyectos.create', {
      url: '/crear',
      controller: require('./proyectos/iniciativas/CreateController'),
      controllerAs: 'vm',
      template: require('./proyectos/iniciativas/views/form.html'),
      resolve: {
        estrategias: function(ProyectoEstrategiaService){
          return ProyectoEstrategiaService.all().then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.proyectos.edit', {
      url: '/editar/:id',
      controller: require('./proyectos/iniciativas/EditController'),
      controllerAs: 'vm',
      template: require('./proyectos/iniciativas/views/form.html'),
      resolve: {
        proyecto: function(ProyectoService, $stateParams) {
          return ProyectoService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        estrategias: function(ProyectoEstrategiaService){
          return ProyectoEstrategiaService.all().then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.objetivos2', {
      url: '/proyectos/objetivos',
      controller: require('./proyectos/objetivos/ListController'),
      controllerAs: 'vm',
      template: require('./proyectos/objetivos/views/index.html'),
      resolve: {
        objetivos: function(ProyectoObjetivoService, $stateParams) {
          return ProyectoObjetivoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.objetivos2.create', {
      url: '/crear',
      controller: require('./proyectos/objetivos/CreateController'),
      controllerAs: 'vm',
      template: require('./proyectos/objetivos/views/form.html'),
      resolve: {
        focos: function(FocoService){
          return FocoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.objetivos2.edit', {
      url: '/editar/:id',
      controller: require('./proyectos/objetivos/EditController'),
      controllerAs: 'vm',
      template: require('./proyectos/objetivos/views/form.html'),
      resolve: {
        objetivo: function(ProyectoObjetivoService, $stateParams) {
          return ProyectoObjetivoService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        focos: function(FocoService){
          return FocoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.estrategias2', {
      url: '/proyectos/estrategias?page',
      controller: require('./proyectos/estrategias/ListController'),
      controllerAs: 'vm',
      template: require('./proyectos/estrategias/views/index.html'),
      resolve: {
        estrategias: function(ProyectoEstrategiaService, $stateParams) {
          return ProyectoEstrategiaService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.estrategias2.create', {
      url: '/crear',
      controller: require('./proyectos/estrategias/CreateController'),
      controllerAs: 'vm',
      template: require('./proyectos/estrategias/views/form.html'),
      resolve: {
        objetivos: function(ProyectoObjetivoService){
          return ProyectoObjetivoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.estrategias2.edit', {
      url: '/editar/:id',
      controller: require('./proyectos/estrategias/EditController'),
      controllerAs: 'vm',
      template: require('./proyectos/estrategias/views/form.html'),
      resolve: {
        estrategia: function(ProyectoEstrategiaService, $stateParams) {
          return ProyectoEstrategiaService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        objetivos: function(ProyectoObjetivoService){
          return ProyectoObjetivoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.hitos2', {
      url: '/proyectos/hitos',
      controller: require('./proyectos/hitos/ListController'),
      controllerAs: 'vm',
      template: require('./proyectos/hitos/views/index.html'),
      resolve: {
        hitos: function(ProyectoHitoService, $stateParams) {
          return ProyectoHitoService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.hitos2.create', {
      url: '/crear',
      controller: require('./proyectos/hitos/CreateController'),
      controllerAs: 'vm',
      template: require('./proyectos/hitos/views/form.html'),
      resolve: {
        proyectos: function(ProyectoService){
          return ProyectoService.all().then(function(data) {
            return data.data;
          });
        },
        origenes: function(OrigenIniciativaService){
          return OrigenIniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.hitos2.edit', {
      url: '/editar/:id',
      controller: require('./proyectos/hitos/EditController'),
      controllerAs: 'vm',
      template: require('./proyectos/hitos/views/form.html'),
      resolve: {
        hito: function(ProyectoHitoService, $stateParams) {
          return ProyectoHitoService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        proyectos: function(ProyectoService){
          return ProyectoService.all().then(function(data) {
            return data.data;
          });
        },
        origenes: function(OrigenIniciativaService){
          return OrigenIniciativaService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.actividades2', {
      url: '/proyectos/actividades',
      controller: require('./proyectos/actividades/ListController'),
      controllerAs: 'vm',
      template: require('./proyectos/actividades/views/index.html'),
      resolve: {
        actividades: function(ProyectoActividadService, $stateParams) {
          return ProyectoActividadService.filterResources($stateParams).then(function(data) {
            return data.data;
          });
        }
      }
    })
    .state('app.actividades2.create', {
      url: '/crear',
      controller: require('./proyectos/actividades/CreateController'),
      controllerAs: 'vm',
      template: require('./proyectos/actividades/views/form.html'),
      resolve: {
        hitos: function(ProyectoHitoService){
          return ProyectoHitoService.all().then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadApoyoService, $stateParams) {
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Crear'
      }
    })
    .state('app.actividades2.edit', {
      url: '/editar/:id',
      controller: require('./proyectos/actividades/EditController'),
      controllerAs: 'vm',
      template: require('./proyectos/actividades/views/form.html'),
      resolve: {
        actividad: function(ProyectoActividadService, $stateParams) {
          return ProyectoActividadService.getResource($stateParams.id).then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadApoyoService, $stateParams) {
          return UnidadApoyoService.all().then(function(data) {
            return data.data;
          });
        },
        hitos: function(ProyectoHitoService){
          return ProyectoHitoService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Editar'
      }
    })
    .state('app.calendario', {
      url: '/calendario',
      controller: require('./calendario/CalendarioController'),
      controllerAs: 'vm',
      template: require('./calendario/views/index.html'),
      resolve: {
        periodos: function(PeriodoService) {
          return PeriodoService.all_a().then(function(data) {
            return data.data;
          });
        },
        unidades: function(UnidadService){
          return UnidadService.all().then(function(data) {
            return data.data;
          });
        }
      },
      data: {
        title: 'Calendario'
      }
    })
  $urlRouterProvider.otherwise('/login');
};
