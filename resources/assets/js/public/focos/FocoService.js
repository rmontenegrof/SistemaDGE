module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'focos';

  this.all = () => {
    return $http.get('/api/focos_all');
  };

};
