/**
 * @fileOverview The Community Entity.
 */

// var __ = require('lodash');
// var BPromise = require('bluebird');
// var appError = require('nodeon-error');
var EntityBase = require('nodeon-base').EntityBase;
var helpers = require('nodeon-helpers');

// var log = require('logg').getLogger('app.ent.Community');

var CommunityModel = require('../models/community.model');
var communityModel = CommunityModel.getInstance();

/**
 * The Community entity.
 *
 * @constructor
 * @extends {app.EntityBase}
 */
var Community = module.exports = EntityBase.extendSingleton(function() {
  this.setModel(communityModel.Model);
  this.method('createApi', this.create);
  this.method('readOneApi', this.readOne);
  this.method('readApi', this.read);
  this.method('updateApi', this.update);

  this.readApi.after(helpers.skipArgs(this.sanitizeResults, 1, this));
  this.readOneApi.after(helpers.skipArgs(this.sanitizeResult, 1, this));
  this.createApi.after(helpers.skipArgs(this.sanitizeResult, 1, this));
  this.updateApi.after(helpers.skipArgs(this.sanitizeResult, 2, this));
});

/**
 * Will sanitize the results, remove hidden / internal attributes.
 *
 * @param {Array.<mongoose.Document>} results Results
 * @return {Array.<Object>} An array of objects.
 */
Community.prototype.sanitizeResults = function(results) {
  if (!Array.isArray(results)) {
    return results;
  }

  var cleanResults = [];
  results.forEach(function(item) {
    cleanResults.push(this.sanitizeResult(item));
  }, this);
  return cleanResults;
};

/**
 * Sanitize a single result.
 *
 * @param {mongoose.Document} item The item.
 */
Community.prototype.sanitizeResult = function(item) {
  if (!item) {
    return item;
  }
  if (!item.toPublic) {
    if (item._id) {
      return this._sanitizeObject(item);
    } else {
      return item;
    }
  }
  var cleanItem = item.toPublic();

  return cleanItem;
};

/**
 * This method will sanitize an object item (not a mongoose.Document).
 *
 * @param {Object} item The item.
 * @return {Object} The sanitized item.
 * @private
 */
Community.prototype._sanitizeObject = function(item) {
  delete item._id;
  delete item.__v;

  // hack to properly format date
  if (item.createdAt && typeof item.createdAt.toISOString === 'function') {
    item.createdAt = item.createdAt.toISOString();
  }

  return item;
};
