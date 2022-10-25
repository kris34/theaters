const homeController = require('express').Router();

homeController.get('/', (req, res) => {


  res.render('guest-home', {
    title: 'Home Page',
  });

  
});

module.exports = homeController;
