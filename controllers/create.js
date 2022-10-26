const { createPlay } = require('../services/playService');

const createController = require('express').Router();

createController.get('/', async (req, res) => {
  res.render('create', {
    title: 'Create play',
  });
});

 createController.post('/', async (req, res) => {
  const play = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    isPublic: req.body.isPublic,
    
  };

  //console.log(play);

  await createPlay(play);

  res.redirect('/');
}); 

module.exports = createController;
