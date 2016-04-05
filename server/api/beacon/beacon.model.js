'use strict';

import mongoose from 'mongoose';

var BeaconSchema = new mongoose.Schema({
  macAddress: String,
  distance: Number,
  angle: Number,
  neighbors: [{type: mongoose.Schema.ObjectId, ref: 'Beacon'}]
});

export default mongoose.model('Beacon', BeaconSchema);
