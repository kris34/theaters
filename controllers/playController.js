const { restart } = require('nodemon');
const {
  getById,
  likePlay,
  deleteById,
  editPlay,
} = require('../services/playService');
const { parseError } = require('../util/parser');

const playController = require('express').Router();

playController.get('/:id', async (req, res) => {
  const play = await getById(req.params.id);

  play.isOwner = play.owner.toString() == req.user._id.toString();
  play.liked = play.users
    .map((x) => x.toString())
    .includes(req.user._id.toString());

  res.render('details', {
    title: 'Play Details',
    play,
  });
});

playController.get('/:id/like', async (req, res) => {
  const play = await getById(req.params.id);

  if (
    play.owner.toString() != req.user._id.toString() &&
    play.users.map((x) => x.toString()).includes(req.user._id.toString()) ==
      false
  ) {
    await likePlay(req.params.id, req.user._id);
  }

  res.redirect('/');
});

playController.get('/:id/delete', async (req, res) => {
  const play = await getById(req.params.id);

  if (play.owner.toString() == req.user._id.toString()) {
    await deleteById(req.params.id);
    res.redirect('/');
  }
});

playController.get('/:id/edit', async (req, res) => {
  const play = await getById(req.params.id);

  res.render('edit', {
    title: 'Edit Play',
    play,
  });
});

playController.post('/:id/edit', async (req, res) => {
  const existing = await getById(req.params.id);

  try {
    await editPlay(existing, req.body);
    res.redirect('/');
  } catch (err) {
    const errors = parseError(err);

    res.render('edit', {
      title: 'Edit Play',
      existing,
      errors,
    });
  }

  res.render('edit', {
    title: 'Edit Play',
    existing,
  });
});

module.exports = playController;
