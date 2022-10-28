const { getAllByDate, getAllByLIkes } = require('../services/playService');

const sortController = require('express').Router();

sortController.get('/byDate', async (req, res) => {
  const plays = await getAllByDate();

  res.render('user-home', {
    title: 'Home page',
    plays,
  });
});

sortController.get('/byLikes', async (req, res) => {
  const plays = await getAllByLIkes();
 console.log(plays);
 
  res.render('user-home', {
    title: 'Home page',
    plays,
  });
});

module.exports = sortController;
