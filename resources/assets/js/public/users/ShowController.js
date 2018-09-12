module.exports = function (usuario, UserService, $state, $stateParams, toastr) {
  'ngInject';
  var vm = this;
  vm.action = 'Detalle';
  vm.data = usuario;
  vm.errors = {};
  vm.formIsSubmit = false;
  vm.opcionesTipo = [
    {id: 1, nombre: "Usuario Unidad"},
    {id: 2, nombre: "Usuario de Consulta"},
    {id: 3, nombre: "Administrador"}
  ];

  inicializar();

  this.hasError = function(property) {
    if (vm.errors.hasOwnProperty(property)) {
      return true;
    }
    return false;
  };

  this.getId = function () {
    return $stateParams.id;
  };

  function inicializar(){
    var x = [];
    for (var i = usuario.unidades.length - 1; i >= 0; i--) {
      x.push({ id: usuario.unidades[i].unidad.id_unidad_estrategica,
        unidad: usuario.unidades[i].unidad.unidad});
    }
    vm.data.unidades = x; 
  }
};