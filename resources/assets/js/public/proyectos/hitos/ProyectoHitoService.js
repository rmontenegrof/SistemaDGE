module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'hitos_proyectos';

    this.all = () => {
    return $http.get('/api/hitos_proyectos_all');
  };

};
