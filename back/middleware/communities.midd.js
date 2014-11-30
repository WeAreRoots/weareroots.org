/**
 * @fileOverview Communities Middleware.
 */

var MiddlewareBase = require('nodeon-base').MiddlewareBase;

var log = require('logg').getLogger('app.midd.Community');

var CommunityEnt = require('../entities/community.ent');


/**
 * The Communities Middleware.
 *
 * @contructor
 * @extends {app.Middleware}
 */
var Community = module.exports = MiddlewareBase.extendSingleton(function () {
});


/**
 * Will fetch and populate all communities of the city.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function} next Pass control.
 * @private
 */
Community.prototype.populate = function (req, res, next) {
  CommunityEnt.getInstance().read({cityOwner: req.city._id})
    .bind(this)
    .then(function(result) {
      if (!result) {
        res.locals.communities = [];
      } else {
        res.locals.communities = result;
      }
      next();
    })
    .catch(function (err) {
      log.warn('_fetchCommunities() :: Error on fetching communities:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).render('city/error/500', {error: err});
    });
};
