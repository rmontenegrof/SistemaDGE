module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'actividades';

};
