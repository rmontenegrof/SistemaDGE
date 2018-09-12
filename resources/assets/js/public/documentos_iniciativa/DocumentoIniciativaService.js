module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  this.resource = 'iniciativas/0/archivos';

  this.setIniciativa = (id) => {
    this.resource = 'iniciativas/'+id+'/archivos';
  };

  this.getUploadRoute = function() {
    return 'api/'+this.resource;
  };

};
