/**
 * @fileOverview Communities CRUD controller.
 */

// var log = require('logg').getLogger('app.ctrl.city.Dashboard');
var ControllerBase = require('nodeon-base').ControllerBase;
var CrudeEntity = require('crude-entity');

var CommunityEnt = require('../../entities/community.ent');
var CommunityMidd = require('../../middleware/communities.midd');

/**
 * Communities CRUD controller.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Community = module.exports = ControllerBase.extendSingleton(function () {
  this.crude = new CrudeEntity('/community', CommunityEnt);
  this.crude.config({
    idField: '_id',
    pagination: false,
    entityCreate: 'createApi',
    entityReadOne: 'readOneApi',
    entityReadLimit: 'readLimitApi',
    entityUpdate: 'updateApi',
  });

  var communityMidd = CommunityMidd.getInstance();

  this.add = [
    this._add.bind(this),
  ];
  this.del = [
    communityMidd.populateSingleFromParam.bind(communityMidd),
    this._del.bind(this),
  ];
  this.edit = [
    communityMidd.populateSingleFromParam.bind(communityMidd),
    this._edit.bind(this),
  ];
});

/**
 * The add an item form.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Community.prototype._add = function(req, res) {
  res.render('city/community/add', {
    reqPath: req.path
  });
};

/**
 * The del an item form.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Community.prototype._del = function(req, res) {
  res.render('/city/community/del', {
    reqPath: req.path
  });
};

/**
 * The edit an item form.
 *
 * @param {Object} req The request Object.
 * @param {Object} res The response Object.
 */
Community.prototype._edit = function(req, res) {
  res.render('/city/community/edit', {
    reqPath: req.path
  });
};
