module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);

  this.me = () => {
    return $http.get('/api/me');
  };

  this.changePassword = (data) => {
    return $http.post('/api/changePassword', data);
  }

  this.resource = 'users';
};
