'use strict';
(function(){

class PathsComponent {
  constructor($http) {
    this.$http = $http;
    this.pathForm = {
      name: '',
      beaconIds: [],
      angles: [],

      selectedAngle: 0,
      selectedBeacon: null
    };
  }

  removeSelectedBeacon(beacon) {
    this.availableBeacons = this.availableBeacons.filter( (availableBeacon) => {
      return (availableBeacon._id !== beacon._id);
    });
  }

  addToNewPath(beacon, angle) {
    this.pathForm.beaconIds.push(beacon._id);
    this.pathForm.angles.push(angle);
  }

  resetSelects() {
    this.pathForm.selectedAngle = 0;
    this.pathForm.selectedBeacon = {};
  }

  plusBeacon() {
    const { selectedBeacon, selectedAngle } = this.pathForm;
    this.addToNewPath(selectedBeacon, selectedAngle);
    this.resetSelects();
    this.removeSelectedBeacon(selectedBeacon);
  }

  submitPath() {
    const payload = {
      name: this.pathForm.name,
      beaconIds: this.pathForm.beaconIds,
      angles: this.pathForm.angles
    };
    this.$http.post('/api/paths', payload).then(response => {
      console.log(response);
    });
  }

  $onInit() {
    this.$http.get('/api/paths').then(response => {
      this.paths = response.data;
    }).then(()=> {
      this.$http.get('/api/beacons').then(response => {
        this.beacons = response.data;
        this.availableBeacons = this.beacons;
      });
    });
  }
}

angular.module('pathFinderApp')
  .component('paths', {
    templateUrl: 'app/paths/paths.html',
    controller: PathsComponent
  });

})();
