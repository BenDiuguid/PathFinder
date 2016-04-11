'use strict';

import mongoose from 'mongoose';

var BeaconSchema = new mongoose.Schema({
  nickname: String,
  macAddress: String
});

export default mongoose.model('Beacon', BeaconSchema);
