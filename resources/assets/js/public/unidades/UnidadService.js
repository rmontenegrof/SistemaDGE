module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'unidades';

  this.all = () => {
    return $http.get('/api/unidades_all');
  };

  this.sendEmail = (data) => {
    return $http.post('/api/sendEmail', data);
  };

};
