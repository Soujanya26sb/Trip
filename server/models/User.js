const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAtLocal: { type: String, default: '' },
  createdAtTimezone: { type: String, default: 'Asia/Kolkata' }
});

module.exports = mongoose.model('User', UserSchema);