const { getAllByDate, getAllByLIkes } = require('../services/playService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
  let view;
  let plays = [];

  if (req.user) {
    view = 'user-home';
    plays = await getAllByDate();
    // console.log(plays);
  } else {
    view = 'guest-home';
    plays = await getAllByLIkes();
  }

  res.render(view, {
    title: 'Home Page',
    plays,
  });
});

module.exports = homeController;
