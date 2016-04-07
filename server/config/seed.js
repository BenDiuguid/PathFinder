/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Path from '../api/path/path.model';
import Beacon from '../api/beacon/beacon.model';
import User from '../api/user/user.model';

var beacon1, beacon2;

Beacon.find({}).remove()
  .then(() => {
    return Beacon.create({
      nickname: "Darth Vader",
      macAddress: "123",
      angles: [],
      distances: [],
      neighbors: []
    });
  })
  .then((beacon) => {
    beacon1 = beacon;
    return Beacon.create({
      nickname: "Kylo Ren",
      macAddress: "456",
      angles: [],
      distances: [],
      neighbors: []
    });
  })
  .then((beacon) => {
    beacon2 = beacon;

    beacon1.neighbors.push(beacon2._id);
    beacon1.distances.push(100);
    beacon1.angles.push(0);

    beacon2.neighbors.push(beacon1._id);
    beacon2.distances.push(100);
    beacon2.angles.push(180);

    return Promise.all([beacon1.save(), beacon2.save()]);
  })
  .then(() => {
    return Path.find({}).remove();
  })
  .then(() => {
    return Path.create({
      name: 'WINNER',
      beaconIds: [beacon1._id, beacon2._id],
      angles: [77]
    });
  })
  .then(() => {
    console.log('finished populating beacons and paths');
  });


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
