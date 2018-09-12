module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'objetivos';
  
  this.panel_acciones = () => {
    return $http.get('/api/objetivos_panel_acciones');
  };

  this.asociar_estrategias = (data, id) => {
    return $http.post('/api/objetivos_asociar', data, id);
  }
};
