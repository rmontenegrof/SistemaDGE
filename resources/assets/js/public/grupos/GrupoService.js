module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'grupos';

  this.getAll = function() {
	return $http.get('/api/grupos_all');
  };

};
