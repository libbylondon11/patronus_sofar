var app = angular.module('patApp', []);

app.controller('TheController', ['$http', function($http){
  var vm = this;
  var anArray=[];
  vm.first_name = '';
  vm.last_name = '';

vm.getPeople = function(){
    $http.get('/people').then(function(response){
    vm.anArray = response.data;
    console.log(response.data);
    return response.data;
  });
}

  vm.sendDataPeople = function(){
    $http.post('/people', {first_name: vm.first_name, last_name: vm.last_name}).then(function(serverResponse){
      console.log(serverResponse);
    });
  }
}]);

app.controller('OtherController', ['$http', function($http){

  var mv = this;
  var anotherArray=[];

  mv.patronus_name = '';

  mv.getPatronuses=function(){
      $http.get('/patronus').then(function(response){
      mv.anotherArray = response.data;
      console.log(response.data);
      return response.data;
    });
  }

  mv.sendDataPatronus = function(){

    $http.post('/patronus', {patronus_name: mv.patronus_name}).then(function(serverResponse){
      console.log(serverResponse);
    });
  }
  getPeople();
  getPatronuses();
}]);
