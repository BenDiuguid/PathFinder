'use strict';

var app = require('../..');
import request from 'supertest';

var newPath;

describe('Path API:', function() {

  describe('GET /api/paths', function() {
    var paths;

    beforeEach(function(done) {
      request(app)
        .get('/api/paths')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paths = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(paths).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/paths', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/paths')
        .send({
          name: 'New Path',
          info: 'This is the brand new path!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPath = res.body;
          done();
        });
    });

    it('should respond with the newly created path', function() {
      expect(newPath.name).to.equal('New Path');
      expect(newPath.info).to.equal('This is the brand new path!!!');
    });

  });

  describe('GET /api/paths/:id', function() {
    var path;

    beforeEach(function(done) {
      request(app)
        .get('/api/paths/' + newPath._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          path = res.body;
          done();
        });
    });

    afterEach(function() {
      path = {};
    });

    it('should respond with the requested path', function() {
      expect(path.name).to.equal('New Path');
      expect(path.info).to.equal('This is the brand new path!!!');
    });

  });

  describe('PUT /api/paths/:id', function() {
    var updatedPath;

    beforeEach(function(done) {
      request(app)
        .put('/api/paths/' + newPath._id)
        .send({
          name: 'Updated Path',
          info: 'This is the updated path!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPath = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPath = {};
    });

    it('should respond with the updated path', function() {
      expect(updatedPath.name).to.equal('Updated Path');
      expect(updatedPath.info).to.equal('This is the updated path!!!');
    });

  });

  describe('DELETE /api/paths/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/paths/' + newPath._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when path does not exist', function(done) {
      request(app)
        .delete('/api/paths/' + newPath._id)
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
