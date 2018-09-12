module.exports = function (ApiService, $http) {
  'ngInject';
  angular.extend(this, ApiService);
  
  this.resource = 'estrategias';

  this.all = () => {
    return $http.get('/api/estrategias_all');
  };

  this.asociar_iniciativas = (data, id) => {
    return $http.post('/api/iniciativas_asociar', data, id);
  }

};
