const { getById } = require('../services/playService');

const playController = require('express').Router();

playController.get('/:id', async (req, res) => {
  const play = await getById(req.params.id);


  res.render('details', {
    title: 'Play Details',
    play,
  });
});

module.exports = playController;
