'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }

}

angular.module('pathFinderApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
