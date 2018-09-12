module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'hitos';

  this.all = () => {
    return $http.get('/api/hitos_all');
  };

};
