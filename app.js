(function(){
	var app = angular.module('doctorApp', []);
 	app.controller('DoctorController', [ '$http', function($http) {
    		var doctorC = this;
    		doctorC.doctors = [];
    		$http.get("http://localhost:3000/doctors.json").success( function(data) {
      			doctorC.doctors = data;
      		});
    }]);
 	app.directive('doctorShow', function() {
 		return {
 			restrict: 'E',
 			templateUrl: 'show-doc.html'
 		}
 	});
})();
