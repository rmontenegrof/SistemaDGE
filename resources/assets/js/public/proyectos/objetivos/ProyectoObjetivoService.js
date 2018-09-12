module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'objetivos_proyectos';

  this.all = () => {
    return $http.get('/api/objetivos_proyectos_all');
  };

};
