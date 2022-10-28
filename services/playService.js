const Play = require('../models/Play');

async function getById(id) {
  return Play.findById(id).lean();
}

async function getAllByDate() {
  return Play.find({}).sort({ createdAt: 1 }).lean();
}

async function createPlay(play) {
  return Play.create(play);
}

async function likePlay(playId, userid) {
  const existing = await Play.findById(playId);
  existing.users.push(userid);
  existing.likesCount++;

  return existing.save();
}

async function getAllByLIkes() {
  return Play.find({}).sort({ likesCount: -1 }).lean();
} 

async function deleteById(id) {
  return Play.findByIdAndRemove(id);
}

async function editPlay(play) { 

}
module.exports = {
  getAllByDate,
  createPlay,
  getById,
  likePlay,
  getAllByLIkes,
  deleteById
};
