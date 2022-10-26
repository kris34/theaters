const Play = require('../models/Play');

async function getAllByDate() {
  return Play.find({}).sort({ createdAt: 1 }).lean();
}

async function createPlay(play) {
  return Play.create(play);
}

module.exports = {
  getAllByDate,
  createPlay
};
