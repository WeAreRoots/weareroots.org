/**
 * @fileOverview Routes for City.
 */
var log = require('logg').getLogger('app.router.city');

var HomeCtrl = require('../controllers/city/index.ctrl');
var StaticsCtrl = require('../controllers/city/statics.ctrl');
var DashboardCtrl = require('../controllers/city/dashboard.ctrl');
var CommunityCtrl = require('../controllers/city/community.ctrl');

var router = module.exports = {};

/**
 * Initialize routes.
 *
 * @param {express} app Express instance.
 */
router.init = function(app) {
  log.fine('init() :: initializing routes...');
  var homeCtrl = HomeCtrl.getInstance();
  var staticsCtrl = StaticsCtrl.getInstance();
  var dashboardCtrl = DashboardCtrl.getInstance();
  var communityCtrl = CommunityCtrl.getInstance();

  app.get('/', homeCtrl.use);

  app.get('/submit-event', staticsCtrl.use);

  app.get('/dashboard', dashboardCtrl.use);

  app.get('/community/:id/edit', communityCtrl.edit);
  app.get('/community/:id/delete', communityCtrl.del);
  app.get('/community/add', communityCtrl.add);
  communityCtrl.crude.addRoutes(app);
};
