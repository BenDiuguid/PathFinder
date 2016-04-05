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
    Beacon.create({
      macAddress: "123",
      distance: 100,
      angle: 0,
      neighbors: []
    })
    .then((beacon) => {
      beacon1 = beacon;
      Beacon.create({
        macAddress: "456",
        distance: 100,
        angle: 180,
        neighbors: []
      })
      .then((beacon) => {
        beacon2 = beacon;
        beacon1.neighbors.push(beacon2._id);
        beacon2.neighbors.push(beacon1._id);
        
        return Promise.all([beacon1.save(), beacon2.save()])
      })
      .then(() => {

        return Path.find({}).remove()
          .then(() => {
            Path.create({
              name: 'WINNER',
              beaconIds: [beacon1._id, beacon2._id]
            })
            .then(() => {
              console.log('finished populating beacons and paths');
            });
          });

      });
    });
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
