const mongoose = require('mongoose');

const apiSyncLogSchema = new mongoose.Schema({
  source: { type: String, enum: ['websoft', 'securesoft'], required: true },
  endpoint: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed', 'partial'], required: true },
  recordsFetched: { type: Number, default: 0 },
  recordsSynced: { type: Number, default: 0 },
  recordsFailed: { type: Number, default: 0 },
  duration: { type: Number, default: 0 },
  errorMessage: { type: String },
  syncedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('ApiSyncLog', apiSyncLogSchema);
