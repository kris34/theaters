const homeController = require('express').Router();

homeController.get('/', (req, res) => {
  let view;

    
  res.render('guest-home', {
    title: 'Home Page',
  });


});

module.exports = homeController;
