module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'iniciativas';


  this.all = () => {
    return $http.get('/api/iniciativas_all');
  };
};
