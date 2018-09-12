module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'estrategias_proyectos';

    this.all = () => {
    return $http.get('/api/estrategias_proyectos_all');
  };

};
