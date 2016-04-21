/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/paths              ->  index
 * POST    /api/paths              ->  create
 * GET     /api/paths/:id          ->  show
 * PUT     /api/paths/:id          ->  update
 * DELETE  /api/paths/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Path from './path.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    console.log(updates);
    var updated = _.merge(entity, updates);
    updated.beacons = updates.beacons;
    updated.angles = updates.angles;
    updated.markModified('angles');
    updated.markModified('beacons');
    console.log(updated);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Paths
export function index(req, res) {
  return Path.find()
    .populate('beacons')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Path from the DB
export function show(req, res) {
  return Path.findById(req.params.id)
    .populate('beacons')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Path in the DB
export function create(req, res) {
  return Path.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Path in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Path.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Path from the DB
export function destroy(req, res) {
  return Path.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
