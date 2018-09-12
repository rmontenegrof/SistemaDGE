module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'proyectos';

  this.all = () => {
    return $http.get('/api/proyectos_all');
  };

  this.all_query = () => {
    return $http.get('/api/proyectos_all_query');
  };

  

};
