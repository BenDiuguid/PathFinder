'use strict';

import mongoose from 'mongoose';

var PathSchema = new mongoose.Schema({
  name: String,
  beaconIds: [String]
});

export default mongoose.model('Path', PathSchema);
