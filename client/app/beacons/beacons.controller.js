'use strict';
(function(){

class BeaconsComponent {
  constructor($http) {
    this.$http = $http;
  }

  resetNewBeaconFields() {
    this.newBeacon.nickname = '';
    this.newBeacon.macAddress = '';
  }

  createNewBeaconFromModel() {
    const beacon = {
      nickname: this.newBeacon.nickname,
      macAddress: this.newBeacon.macAddress
    };
    this.createNewBeacon(beacon);
  }

  createNewBeacon(beacon) {
    this.$http.post('/api/beacons/', beacon).then(response => {
      this.beacons.push(response.data);
      this.resetNewBeaconFields();
    });
  }

  updateBeaconFromIndex(beaconIndex) {
    this.updateBeacon(this.beacons[beaconIndex]);
  }

  updateBeacon(beacon) {
    this.$http.put('/api/beacons/'+beacon._id, beacon).then(response => {
      console.log(response);
    });
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
