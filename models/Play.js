const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const playSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
    maxlength: [50, 'Your description cannot exceed 50 charakters!'],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: 'Invalid image URL',
    },
  },
  isPublic: { Type: Boolean, default: false },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  users: { type: [Types.ObjectId], ref: ' User', default: [] },
  likesCount: { type: Number, default: 0 },
});

playSchema.index(
  { title: 1 },
  {
    collation: {
      locale: 'en',
      strength: 2,
    },
  }
);

const Play = model('Play', playSchema);

module.exports = Play;
