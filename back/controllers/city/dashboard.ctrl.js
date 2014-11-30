/**
 * @fileOverview GET /dashboard City page.
 */

// var log = require('logg').getLogger('app.ctrl.city.Dashboard');
var ControllerBase = require('nodeon-base').ControllerBase;

var CommunityMidd = require('../../middleware/communities.midd');
var globals = require('../../core/globals');
var AuthMidd = require('../../middleware/auth.midd');
var authMidd = new AuthMidd(globals.Roles.CITY);

// var CommunitiesEnt = require('../../entities/community.ent');

/**
 * The city Dashboard controller.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Dashboard = module.exports = ControllerBase.extendSingleton(function(){
  var communityMidd = CommunityMidd.getInstance();
  var auth = authMidd.requiresAuth.bind(authMidd);

  this.use.push(auth('dashboard'));
  this.use.push(communityMidd.populate.bind(communityMidd));
  this.use.push(this._useIndex.bind(this));
});
/**
 * The index page.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Dashboard.prototype._useIndex = function(req, res) {
  req.i18n.setLocale(req.city.lang);

  res.render('city/dashboard', {
    og: null, // title, site_name, url, description, image, appId, type
    pageTitle: null,
    ga: null, // GA id
    gaSite: null, // Canonical GA website name
  });
};
