/**
 * Created by fx on 17-5-14.
 */
"use strict";

/**
 * @param {String} path Path to directory containing the files
 * @constructor
 */
var Persistency = exports.Persistency = function(wfModule) {
    this.WF = wfModule;
};

/**
 * @param {{processInstanceId: String}} persistentData
 * @param {Function} done
 */
Persistency.prototype.persist = function(persistentData, done) {
    persistentData._updated = Date.now();
    this.WF.findOneAndUpdate({processId: persistentData.processId},persistentData,{upsert:true,new:true},done);
};

/**
 * @param {String} processId
 * @param {String} processName
 * @param done
 */
Persistency.prototype.load = function(processId, processName, done) {
    this.WF.findOne({processId: processId, processName: processName},done)
};

/**
 * @param {String} processName
 * @param done
 */
Persistency.prototype.loadAll = function(processName, done) {
    this.WF.find({processName: processName},done);
};

Persistency.prototype.close = function() {};
