/**
 * Beacon model events
 */

'use strict';

import {EventEmitter} from 'events';
import Beacon from './beacon.model';
var BeaconEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BeaconEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Beacon.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BeaconEvents.emit(event + ':' + doc._id, doc);
    BeaconEvents.emit(event, doc);
  }
}

export default BeaconEvents;
