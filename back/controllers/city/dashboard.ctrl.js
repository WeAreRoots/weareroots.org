/**
 * @fileOverview GET /dashboard City page.
 */

// var log = require('logg').getLogger('app.ctrl.city.Dashboard');
var ControllerBase = require('nodeon-base').ControllerBase;

var CommunityMidd = require('../../middleware/communities.midd');

// var CommunitiesEnt = require('../../entities/community.ent');

/**
 * The city Dashboard controller.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Dashboard = module.exports = ControllerBase.extendSingleton(function(){
  var communityMidd = CommunityMidd.getInstance();
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
    reqPath: req.path
  });
};
