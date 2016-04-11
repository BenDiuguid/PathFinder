'use strict';

import mongoose from 'mongoose';

var PathSchema = new mongoose.Schema({
  name: String,
  angles: [Number],
  beacons: [{type: mongoose.Schema.ObjectId, ref: 'Beacon'}]
});

export default mongoose.model('Path', PathSchema);
