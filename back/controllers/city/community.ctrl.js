/**
 * @fileOverview Communities CRUD controller.
 */

// var log = require('logg').getLogger('app.ctrl.city.Dashboard');
var ControllerBase = require('nodeon-base').ControllerBase;
var CrudeEntity = require('crude-entity');

var CommunityEnt = require('../../entities/community.ent');

/**
 * Communities CRUD controller.
 *
 * @contructor
 * @extends {app.ControllerBase}
 */
var Dashboard = module.exports = ControllerBase.extendSingleton(function(){
  this.crude = new CrudeEntity('/community', CommunityEnt);
  this.crude.config({
    idField: '_id',
    pagination: false,
    entityCreate: 'createApi',
    entityReadOne: 'readOneApi',
    entityReadLimit: 'readLimitApi',
    entityUpdate: 'updateApi',
  });
});
