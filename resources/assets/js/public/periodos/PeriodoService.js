module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'periodos';

  this.all_a = () => {
    return $http.get('/api/periodos_all_a');
  };

  this.all = () => {
    return $http.get('/api/periodos_all');
  };

};
