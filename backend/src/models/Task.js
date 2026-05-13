const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'under_review', 'completed', 'overdue', 'escalated', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['billing', 'operations', 'support', 'development', 'admin', 'finance', 'hr', 'other'],
    default: 'operations'
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  dueDate: { type: Date },
  startDate: { type: Date, default: Date.now },
  completedAt: { type: Date },
  estimatedHours: { type: Number, default: 0 },
  actualHours: { type: Number, default: 0 },
  slaDeadline: { type: Date },
  isEscalated: { type: Boolean, default: false },
  escalatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  escalationReason: { type: String },
  tags: [{ type: String }],
  attachments: [{
    name: String,
    url: String,
    type: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  activityLog: [{
    action: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: String,
    timestamp: { type: Date, default: Date.now }
  }],
  websoftTaskId: { type: String },
  websoftSyncedAt: { type: Date },
  progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
  isRecurring: { type: Boolean, default: false },
  recurringPattern: { type: String, enum: ['daily', 'weekly', 'monthly', 'none'], default: 'none' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

taskSchema.virtual('isOverdue').get(function () {
  return this.dueDate && new Date() > this.dueDate && this.status !== 'completed';
});

taskSchema.virtual('daysRemaining').get(function () {
  if (!this.dueDate) return null;
  const diff = this.dueDate - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ department: 1, status: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ priority: 1 });

module.exports = mongoose.model('Task', taskSchema);
