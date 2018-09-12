module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'actividades_proyectos';

  this.all = () => {
    return $http.get('/api/actividades_proyectos_all');
  };

};
