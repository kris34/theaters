const authController = require('../controllers/auth');
const createController = require('../controllers/create');
const homeController = require('../controllers/home');
const playController = require('../controllers/playController');
const sortController = require('../controllers/sort');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/create', hasUser(), createController);
  app.use('/play', playController);
  app.use('/sort', sortController);
};
