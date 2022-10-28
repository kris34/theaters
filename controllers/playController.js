const { getById, likePlay, deleteById } = require('../services/playService');

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





module.exports = playController;
