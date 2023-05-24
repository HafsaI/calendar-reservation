app.controller("addTenantsController", function($scope, $http) {
    $scope.day = moment();
    // Getting all the tenants and storing them 
    $http.get("http://localhost:3000/tenant")
        .then(function (response) {
           $scope.temp = response.data;
        });
 
    // Button Click makes a reservation
    $scope.reserve = function () {
       var exist = false;
       for (var i = 0;i < $scope.temp.length; i++){
          if ($scope.temp[i].tennantName == $scope.tenantname && $scope.temp[i].time == $scope.day.unix()){
             exist = true;
             break;
          }
       };
       if(!exist && $scope.tenantname.length >= 0){
          $scope.temp.push({
             "tennantName": $scope.tenantname,
             "time": $scope.day.unix(),
             "reserved": true
          });
       }
 
       $http.post(
           "http://localhost:3000/reserve",
           {
              "tennantName": $scope.tenantname,
              "time": $scope.day.unix(),
              "reserved": true
           }).success(Success).error(Fail);
    };
 
    // Cancels the reservation
    $scope.cancel = function (name,time) {
       var tempo = false;
       for (var i = 0;i < $scope.temp.length; i++){
          if ($scope.temp[i].tennantName == name && $scope.temp[i].time == time){
             tempo=i;
             break;
          }
       }
       if (tempo !== false){
          $scope.temp.splice(tempo,1);
          $http.post(
              "http://localhost:3000/reserve",
              {
                 "tennantName": name,
                 "time": time,
                 "reserved": false
              }).success(Success).error(Fail);
       }
    };
    // functions to handle indicate whether the backend calls were a success or a failure
    var Success = function (){
       console.log("Successful");
    };
    var Fail = function (){
       console.log("Not successful");
    };
 });
 
 