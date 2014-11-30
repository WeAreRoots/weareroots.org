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
      log.warn('populate() :: Error on fetching communities:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).render('city/error/500', {error: err});
    });
};

/**
 * Will populate a single community item based on the params.id var of the url.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 * @param {Function} next Pass control.
 * @private
 */
Community.prototype.populateSingleFromParam = function (req, res, next) {
  CommunityEnt.getInstance().readOne({_id: req.params.id})
    .bind(this)
    .then(function(result) {
      if (!result) {
        res.status(404).render('/city/error/404');
      } else {
        res.locals.community = result;
        next();
      }
    })
    .catch(function (err) {
      log.warn('populateSingleFromParam() :: Error on fetching community, id:',
        req.params.id, 'Err:', err);
      if (typeof err.toApi === 'function') {
        err = err.toApi();
      }
      res.status(500).render('city/error/500', {error: err});
    });
};
