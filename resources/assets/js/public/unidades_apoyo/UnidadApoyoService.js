module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'unidades_apoyo';

  this.all = () => {
    return $http.get('/api/unidades_apoyo_all');
  };

};
