'use strict';

var app = require('../..');
import request from 'supertest';

var newBeacon;

describe('Beacon API:', function() {

  describe('GET /api/beacons', function() {
    var beacons;

    beforeEach(function(done) {
      request(app)
        .get('/api/beacons')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          beacons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(beacons).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/beacons', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/beacons')
        .send({
          name: 'New Beacon',
          info: 'This is the brand new beacon!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBeacon = res.body;
          done();
        });
    });

    it('should respond with the newly created beacon', function() {
      expect(newBeacon.name).to.equal('New Beacon');
      expect(newBeacon.info).to.equal('This is the brand new beacon!!!');
    });

  });

  describe('GET /api/beacons/:id', function() {
    var beacon;

    beforeEach(function(done) {
      request(app)
        .get('/api/beacons/' + newBeacon._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          beacon = res.body;
          done();
        });
    });

    afterEach(function() {
      beacon = {};
    });

    it('should respond with the requested beacon', function() {
      expect(beacon.name).to.equal('New Beacon');
      expect(beacon.info).to.equal('This is the brand new beacon!!!');
    });

  });

  describe('PUT /api/beacons/:id', function() {
    var updatedBeacon;

    beforeEach(function(done) {
      request(app)
        .put('/api/beacons/' + newBeacon._id)
        .send({
          name: 'Updated Beacon',
          info: 'This is the updated beacon!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBeacon = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBeacon = {};
    });

    it('should respond with the updated beacon', function() {
      expect(updatedBeacon.name).to.equal('Updated Beacon');
      expect(updatedBeacon.info).to.equal('This is the updated beacon!!!');
    });

  });

  describe('DELETE /api/beacons/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/beacons/' + newBeacon._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when beacon does not exist', function(done) {
      request(app)
        .delete('/api/beacons/' + newBeacon._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
