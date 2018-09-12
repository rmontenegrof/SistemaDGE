module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'origen_iniciativa';

  this.all = () => {
    return $http.get('/api/origen_iniciativa_all');
  };

};
