var fs = require('fs');
var stringify = require('json-stable-stringify');
var all = require('iD/data/presets/presets.json').presets;

// Because of the open nature of tagging, iD will never have a complete
// list of tags used in OSM, so we want it to have logic like "assume
// that a closed way with an amenity tag is an area, unless the amenity
// is one of these specific types". This function computes a structure
// that allows testing of such conditions, based on the presets designated
// as as supporting (or not supporting) the area geometry.
//
// The returned object L is a keeplist/discardlist of tags. A closed way
// with a tag (k, v) is considered to be an area if `k in L && !(v in L[k])`
// (see `iD.osmWay#isArea()`). In other words, the keys of L form the keeplist,
// and the subkeys form the discardlist.
var areaKeys = {};
var ignore = ['area', 'barrier', 'highway', 'footway', 'railway', 'type'];
var presets = Object.values(all).filter(p => !p.suggestion);

// keeplist
presets.forEach(d => {
    for (var key in d.tags) break;
    if (!key) return;
    if (ignore.indexOf(key) !== -1) return;

    if (d.geometry.indexOf('area') !== -1) {   // probably an area..
        areaKeys[key] = areaKeys[key] || {};
    }
});

// discardlist
presets.forEach(d => {
    for (var key in d.tags) break;
    if (!key) return;
    if (ignore.indexOf(key) !== -1) return;

    var value = d.tags[key];
    if (key in areaKeys &&                      // probably an area...
        d.geometry.indexOf('line') !== -1 &&    // but sometimes a line
        value !== '*') {
        areaKeys[key][value] = true;
    }
});

fs.writeFileSync('areaKeys.json', stringify({ areaKeys: areaKeys }, { space: 4 }));
