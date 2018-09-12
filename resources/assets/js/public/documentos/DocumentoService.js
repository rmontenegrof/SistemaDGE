module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'archivos';

  this.getUploadRoute = function() {
    return '/api/archivos';
  };

};
