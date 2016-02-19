var fs = require('fs'),
    reject = require('lodash.reject'),
    all = require('iD/data/presets/presets.json');

// Because of the open nature of tagging, iD will never have a complete
// list of tags used in OSM, so we want it to have logic like "assume
// that a closed way with an amenity tag is an area, unless the amenity
// is one of these specific types". This function computes a structure
// that allows testing of such conditions, based on the presets designated
// as as supporting (or not supporting) the area geometry.
//
// The returned object L is a whitelist/blacklist of tags. A closed way
// with a tag (k, v) is considered to be an area if `k in L && !(v in L[k])`
// (see `iD.Way#isArea()`). In other words, the keys of L form the whitelist,
// and the subkeys form the blacklist.
var areaKeys = {},
    ignore = ['barrier', 'highway', 'footway', 'railway', 'type'],
    presets = reject(all, 'suggestion');

// whitelist
presets.forEach(function(d) {
    for (var key in d.tags) break;
    if (!key) return;
    if (ignore.indexOf(key) !== -1) return;

    if (d.geometry.indexOf('area') !== -1) {
        areaKeys[key] = areaKeys[key] || {};
    }
});

// blacklist
presets.forEach(function(d) {
    for (var key in d.tags) break;
    if (!key) return;
    if (ignore.indexOf(key) !== -1) return;

    var value = d.tags[key];
    if (d.geometry.indexOf('area') === -1 && key in areaKeys && value !== '*') {
        areaKeys[key][value] = true;
    }
});

fs.writeFileSync('index.js', 'module.exports.areaKeys = ' + JSON.stringify(areaKeys, null, 4) + ';');
