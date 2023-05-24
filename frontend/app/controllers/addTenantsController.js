app.controller("addTenantsController", function($scope, $http) {
    $scope.day = moment();
    // Getting all the tenants and storing them 

      $http.get('http://localhost:3000/tenant')
      .then(response => {
      $scope.bookings = response.data;
      })
      .catch(error => {
         console.log(error)
      });
 
    // Makes a reservation
    $scope.reserve = function () {

       let alreadyBooked = false;
       // looping over all bookings to check if same tenant has already booked

       for (let i = 0;i < $scope.bookings.length; i++){
         // only tenants with same name and date cannot book more than once - else can book
         if ($scope.bookings[i].tennantName == $scope.tenantname && $scope.bookings[i].time == $scope.day.unix()){
            alreadyBooked = true;
            break;
         }
       };

       // if not booked and non-empty name
       if(!alreadyBooked && $scope.tenantname.length >= 0){
         console.log('here', alreadyBooked)
          $scope.bookings.push({
             "tennantName": $scope.tenantname,
             "time": $scope.day.unix(),
             "reserved": true
          });
       }
 
      // tenant with same name booking not added
       $http.post(
         "http://localhost:3000/reserve",
         {
            "tennantName": $scope.tenantname,
            "time": $scope.day.unix(),
            "reserved": true
         }).then(res => {
            console.log("Request Successful", res)
         }
         ).catch(err => {
            // Handle error
            console.log("Request Unsucessful", err);
         });
    };
 
    // Cancels the reservation
    $scope.cancel = function (name,time) {
      let index = -1
      for (var i = 0;i < $scope.bookings.length; i++){
         if ($scope.bookings[i].tennantName == name && $scope.bookings[i].time == time){
            index=i;
            break;
         }
      }
      if (index !== false){
         $scope.bookings.splice(index,1);
         $http.post("http://localhost:3000/reserve", {
            "tennantName": name,
            "time": time,
            "reserved": false
         })
         .then(res => {
            console.log("Request Successful", res)
         }
         ).catch(err => {
            // Handle error
            console.log("Request Unsucessful", err);
         });
      }
    };
 
 });
 
 

 