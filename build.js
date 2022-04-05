const fs = require('fs');
const withLocale = require('locale-compare')('en-US');
const stringify = require('@aitodotai/json-stringify-pretty-compact');
const all = require('@openstreetmap/id-tagging-schema/dist/presets.json');

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
const ignore = ['area', 'barrier', 'highway', 'footway', 'railway', 'type'];
const presets = Object.values(all).filter(p => !p.suggestion);
let areaKeys = {};

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
  if (key in areaKeys &&                     // probably an area...
    d.geometry.indexOf('line') !== -1 &&     // but sometimes a line
    value !== '*') {
    areaKeys[key][value] = true;
  }
});

fs.writeFileSync('areaKeys.json', stringify({ areaKeys: sortObject(areaKeys) }, { maxLength: 1 }));



// Returns an object with sorted keys and sorted values.
// (This is useful for file diffing)
function sortObject(obj) {
  if (!obj) return null;

  let sorted = {};
  Object.keys(obj).sort(withLocale).forEach(k => {
    sorted[k] = Array.isArray(obj[k]) ? obj[k].sort(withLocale) : obj[k];
  });

  return sorted;
}