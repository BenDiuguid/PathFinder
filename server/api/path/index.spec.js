'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var pathCtrlStub = {
  index: 'pathCtrl.index',
  show: 'pathCtrl.show',
  create: 'pathCtrl.create',
  update: 'pathCtrl.update',
  destroy: 'pathCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pathIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './path.controller': pathCtrlStub
});

describe('Path API Router:', function() {

  it('should return an express router instance', function() {
    expect(pathIndex).to.equal(routerStub);
  });

  describe('GET /api/paths', function() {

    it('should route to path.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pathCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/paths/:id', function() {

    it('should route to path.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pathCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/paths', function() {

    it('should route to path.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pathCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/paths/:id', function() {

    it('should route to path.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pathCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/paths/:id', function() {

    it('should route to path.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pathCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/paths/:id', function() {

    it('should route to path.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pathCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
