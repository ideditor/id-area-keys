(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.areaKeys = {}));
}(this, function (exports) { 'use strict';

var areaKeys = {"addr:*":{},advertising:{billboard:true},aerialway:{cable_car:true,chair_lift:true,drag_lift:true,gondola:true,goods:true,magic_carpet:true,mixed_lift:true,platter:true,rope_tow:true,"t-bar":true},aeroway:{runway:true,taxiway:true},allotments:{},amenity:{bench:true},"area:highway":{},attraction:{dark_ride:true,river_rafting:true,summer_toboggan:true,train:true,water_slide:true},"bridge:support":{},building:{},camp_site:{},club:{},craft:{},emergency:{designated:true,destination:true,no:true,official:true,"private":true,yes:true},golf:{hole:true,lateral_water_hazard:true,water_hazard:true},healthcare:{},historic:{},industrial:{},internet_access:{},junction:{circular:true,roundabout:true},landuse:{},leisure:{slipway:true,track:true},man_made:{breakwater:true,crane:true,cutline:true,embankment:true,groyne:true,pier:true,pipeline:true},military:{},natural:{cliff:true,coastline:true,ridge:true,tree_row:true},office:{},"piste:type":{downhill:true,hike:true,ice_skate:true,nordic:true,skitour:true,sled:true,sleigh:true},place:{},playground:{balancebeam:true,slide:true,zipwire:true},power:{cable:true,line:true,minor_line:true},public_transport:{platform:true},"seamark:type":{},shop:{},tourism:{artwork:true},waterway:{canal:true,dam:true,ditch:true,drain:true,river:true,stream:true,weir:true}};

/**
 * Test if the given OpenStreetMap tags imply that a
 * closed way should be treated as an area.
 *
 * @param   {Object}   Object of tags to test
 * @returns {boolean}  true if tags imply area, false if they do not
 * @example
 *   var ak = require('id-area-keys');
 *
 *   ak.isArea({ 'natural': 'wood' });
 *   // true - a closed way tagged `natural=wood` is an area filled with trees
 *
 *   ak.isArea({ 'natural': 'tree_row' });
 *   // false - a closed way tagged `natural=tree_row` is a linear ring of trees
 */
function isArea(tags) {
    if (typeof tags !== 'object')
        return false;

    if (tags.area === 'yes')
        return true;
    if (tags.area === 'no')
        return false;
    for (var key in tags)
        if (key in areaKeys && !(tags[key] in areaKeys[key]))
            return true;

    return false;
}

exports.areaKeys = areaKeys;
exports.isArea = isArea;

Object.defineProperty(exports, '__esModule', { value: true });

}));
