const { createPlay } = require('../services/playService');
const { parseError } = require('../util/parser');

const createController = require('express').Router();

createController.get('/', async (req, res) => {
  res.render('create', {
    title: 'Create play',
  });
});

createController.post('/', async (req, res) => {

  try {
    const play = {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isPublic: req.body.isPublic,
    };

    //console.log(play);

    await createPlay(play);

    res.redirect('/');
  } catch (err) {
    res.render('create', {
      title: 'Create',
      errors: parseError(err),
    });
  }
});

module.exports = createController;
