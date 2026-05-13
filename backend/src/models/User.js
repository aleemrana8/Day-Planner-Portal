const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8, select: false },
  role: {
    type: String,
    enum: ['super_admin', 'director', 'assistant_director', 'lead', 'accounts_manager', 'employee'],
    required: true
  },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  designation: { type: String, default: '' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  lastLogin: { type: Date },
  loginCount: { type: Number, default: 0 },
  refreshToken: { type: String, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'dark' },
    notifications: { type: Boolean, default: true },
    emailAlerts: { type: Boolean, default: true }
  },
  performanceScore: { type: Number, default: 0, min: 0, max: 100 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.canManageRole = function (targetRole) {
  const hierarchy = {
    super_admin: ['director', 'assistant_director', 'lead', 'accounts_manager', 'employee'],
    director: ['assistant_director', 'lead', 'employee'],
    assistant_director: ['lead', 'employee'],
    lead: ['employee'],
    accounts_manager: [],
    employee: []
  };
  return hierarchy[this.role]?.includes(targetRole) || false;
};

module.exports = mongoose.model('User', userSchema);
