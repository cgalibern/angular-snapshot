 (function(){
	var app = angular.module('snapshotApp', []);
 	app.controller('SnapshotController', [ '$http', function($http) {
    var snapshotC = this;
    //snapshotC.snapshots_url = "http://localhost:3000/snapshots"
    snapshotC.snapshots_url = "http://192.168.0.16:3000/snapshots"
    snapshotC.snapshots = [];
    snapshotC.showform = false;
    snapshotC.navtab = 1;

    snapshotC.reload = function() {
      $http.get(snapshotC.snapshots_url+".json").success( function(data) {
      		snapshotC.snapshots = data;
      	});
    };

    snapshotC.reload();

    snapshotC.addSnapshot = function() {
      $http.post(snapshotC.snapshots_url + ".json", {dbserver:snapshotC.formDbserver, dbname: snapshotC.formDbname})
        .success(function(data, status, headers, config) {
          snapshotC.snapshots.push(data);
          console.log("successfully posted snapshot, id=" + data.id);
          snapshotC.toogleForm();
        })
        .error(function(data, status, headers, config) { console.log("fail to create snapshot") });

      snapshotC.resetFormVars();
    };

    snapshotC.delete = function(id) {
      $http.delete(snapshotC.snapshots_url + "/" + id + ".json")
        .success(function (data, status, headers, config) {
          snapshotC.snapshots = snapshotC.snapshots.filter(function (e){
            return e.id !== id;
          });
        })
        .error(function(data, status, headers, config) {
          console.log("fail to delete snaphot")
        });
    };

    snapshotC.resetFormVars = function() {
      snapshotC.formDbserver = '';
      snapshotC.formDbname = '';
    };

    snapshotC.toogleForm = function() {
      snapshotC.showform = snapshotC.showform ? false : true;
      snapshotC.showform && snapshotC.resetFormVars();
    };

    snapshotC.selectTab = function(setTab) {
      snapshotC.navtab = setTab;
      };
    snapshotC.isSelected = function(checkTab) {
        return snapshotC.navtab === checkTab;
      };

    }]);

 	app.directive('snapshotShow', function() {
 		return {
 			restrict: 'E',
 			templateUrl: 'snapshot-show.html'
 		}
 	});

  app.directive('snapshotList', function() {
 		return {
 			restrict: 'E',
 			templateUrl: 'snapshot-list.html'
 		}
 	});

  app.directive('snapshotForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'snapshot-form.html'
    }
  });


})();
