'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var beaconCtrlStub = {
  index: 'beaconCtrl.index',
  show: 'beaconCtrl.show',
  create: 'beaconCtrl.create',
  update: 'beaconCtrl.update',
  destroy: 'beaconCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var beaconIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './beacon.controller': beaconCtrlStub
});

describe('Beacon API Router:', function() {

  it('should return an express router instance', function() {
    expect(beaconIndex).to.equal(routerStub);
  });

  describe('GET /api/beacons', function() {

    it('should route to beacon.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'beaconCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/beacons/:id', function() {

    it('should route to beacon.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'beaconCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/beacons', function() {

    it('should route to beacon.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'beaconCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/beacons/:id', function() {

    it('should route to beacon.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'beaconCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/beacons/:id', function() {

    it('should route to beacon.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'beaconCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/beacons/:id', function() {

    it('should route to beacon.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'beaconCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
