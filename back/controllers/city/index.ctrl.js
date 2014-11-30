/**
 * @fileOverview GET / City page.
 */

// var log = require('logg').getLogger('app.ctrl.city.Index');
var ControllerBase = require('nodeon-base').ControllerBase;

var CommunityMidd = require('../../middleware/communities.midd');

/**
 * The City home page.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Home = module.exports = ControllerBase.extendSingleton(function () {
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
Home.prototype._useIndex = function(req, res) {
  req.i18n.setLocale(req.city.lang);

  res.render('city/index', {
    og: null, // title, site_name, url, description, image, appId, type
    pageTitle: null,
    ga: null, // GA id
    gaSite: null, // Canonical GA website name
  });
};
