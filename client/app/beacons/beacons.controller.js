'use strict';
(function(){

class BeaconsComponent {
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/beacons').then(response => {
      this.beacons = response.data;
    });
  }
}

angular.module('pathFinderApp')
  .component('beacons', {
    templateUrl: 'app/beacons/beacons.html',
    controller: BeaconsComponent
  });

})();
