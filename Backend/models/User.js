const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: {
    type: String,
    default: function () {
      return this._id.toString();
    },
    unique: true
  },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "alumni", "admin"],
    default: "student"
  },
  image: {
    type: String,
    default: "https://www.w3schools.com/w3images/avatar2.png" // ✅ fallback default image
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
