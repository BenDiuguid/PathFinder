/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Path from '../api/path/path.model';
import Beacon from '../api/beacon/beacon.model';
import User from '../api/user/user.model';

var beacon1, beacon2, beacon3, beacon4;

Beacon.find({}).remove()
  .then(() => {
    return Beacon.create({
      nickname: "Jar Jar Binks",
      macAddress: "MAC:JJB"
    },
    {
      nickname: "Luke Skywalker",
      macAddress: "MAC:LSW"
    },
    {
      nickname: "The Chosen One",
      macAddress: "MAC:TCO"
    },
    {
      nickname: "JOHN CENA",
      macAddress: "MAC:JOHN-CENA"
    });
  })
  .then(() => {
    return Beacon.create({
      nickname: "Darth Vader",
      macAddress: "e8b0c6217436"
    })
  })
  .then((beacon) => {
    beacon1 = beacon;
    return Beacon.create({
      nickname: "Kylo Ren",
      macAddress: "f05e48d363a8"
    })
  })
  .then((beacon) => {
    beacon2 = beacon;
    return Beacon.create({
      nickname: "Voldemort",
      macAddress: "f676e7a70791"
    })
  })
  .then((beacon) => {
    beacon3 = beacon;
    return Beacon.create({
      nickname: "Sauron",
      macAddress: "e503828ae387"
    })
  })
  .then((beacon) => {
    beacon4 = beacon;
    return Path.find({}).remove();
  })
  .then(() => {
    return Path.create({
      name: 'WINNER',
      angles: [0, 90, 90, 90],
      beacons: []
    });
  })
  .then((path) => {
    path.beacons.push(beacon1._id);
    path.beacons.push(beacon2._id);
    path.beacons.push(beacon3._id);
    path.beacons.push(beacon4._id);

    return path.save();
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
