'use strict';
(function(){

class PathsComponent {
  constructor($http) {
    this.$http = $http;

    this.selectedAngle = 0;
    this.selectedBeacon = null;
    this.selectedPath = {
      beacons: [],
      angles: [],
      name: ''
    }
  }

  removeBeaconFromAvailable(beacon) {
    this.availableBeacons = this.availableBeacons.filter( (availableBeacon) => {
      return (availableBeacon._id !== beacon._id);
    });
  }

  addToSelectedPath(beacon, angle) {
    this.selectedPath.beacons.push(beacon);
    this.selectedPath.angles.push(angle);
  }

  resetSelectedPath() {
    this.selectedPath = {
      beacons: [],
      angles: [],
      name: ''
    }
    this.availableBeacons = this.allBeacons;
  }

  resetSelectedBeaconAndAngle() {
    this.selectedAngle = 0;
    this.selectedBeacon = null;
  }

  plusBeacon() {
    const beacon = this.selectedBeacon;
    const angle = this.selectedAngle;

    if(!beacon || !angle) return;

    this.addToSelectedPath(beacon, angle);
    this.resetSelectedBeaconAndAngle();
    this.removeBeaconFromAvailable(beacon);
  }

  saveAll() {
    if(!this.selectedPath) return;

    if(this.selectedPath._id) {
      this.$http.put('/api/paths/'+this.selectedPath._id, this.selectedPath).then(response => {
        this.resetSelectedBeaconAndAngle();
        this.resetSelectedPath();
      });
    } else {
      this.$http.post('/api/paths/', this.selectedPath).then(response => {
        this.paths.push(this.selectedPath);
        this.resetSelectedBeaconAndAngle();
        this.resetSelectedPath();
      });
    }
  }

  selectPath(pathIndex) {
    this.availableBeacons = this.allBeacons;
    this.selectedPath = this.paths[pathIndex];

    this.selectedPath.beacons.map( this.removeBeaconFromAvailable.bind(this) );
  }

  removeBeaconFromSelectedPath(beaconIndex) {
    const selectedBeaconId = this.selectedPath.beacons[beaconIndex]._id;
    this.selectedPath.beacons = this.selectedPath.beacons.filter( beacon => beacon._id !== selectedBeaconId );
  }

  $onInit() {
    this.$http.get('/api/paths').then(response => {
      this.paths = response.data;
    }).then(() => {
      return this.$http.get('/api/beacons');
    }).then(response => {
      this.allBeacons = response.data;
      this.availableBeacons = this.allBeacons;
    }).catch( err => console.error(err) );
  }
}

angular.module('pathFinderApp')
  .component('paths', {
    templateUrl: 'app/paths/paths.html',
    controller: PathsComponent
  });

})();
