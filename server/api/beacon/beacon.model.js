'use strict';

import mongoose from 'mongoose';

var BeaconSchema = new mongoose.Schema({
  nickname: String,
  macAddress: String,
  neighbors: [{type: mongoose.Schema.ObjectId, ref: 'Beacon'}],
  distances: [Number],
  angles: [Number]
});

export default mongoose.model('Beacon', BeaconSchema);
