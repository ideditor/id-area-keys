const test = require('tap').test;
const ak = require('../.');

test('id-area-keys', function(t) {

  t.test('areaKeys', function(t) {
    t.test('exports areaKeys', function(t) {
      t.type(ak.areaKeys, 'object');
      t.end();
    });

    t.test('areaKeys includes certain keys', function(t) {
      t.ok(ak.areaKeys.hasOwnProperty('amenity'), 'amenity');
      t.ok(ak.areaKeys.hasOwnProperty('building'), 'building');
      t.ok(ak.areaKeys.hasOwnProperty('landuse'), 'landuse');
      t.ok(ak.areaKeys.hasOwnProperty('leisure'), 'leisure');
      t.ok(ak.areaKeys.hasOwnProperty('man_made'), 'man_made');
      t.ok(ak.areaKeys.hasOwnProperty('natural'), 'natural');
      t.ok(ak.areaKeys.hasOwnProperty('waterway'), 'waterway');
      t.end();
    });

    t.test('areaKeys includes certain discardlisted keys', function(t) {
      t.ok(ak.areaKeys.amenity.hasOwnProperty('bench'), 'bench');
      t.ok(ak.areaKeys.leisure.hasOwnProperty('track'), 'track');
      t.ok(ak.areaKeys.man_made.hasOwnProperty('pipeline'), 'pipeline');
      t.ok(ak.areaKeys.natural.hasOwnProperty('tree_row'), 'tree_row');
      t.ok(ak.areaKeys.waterway.hasOwnProperty('river'), 'river');
      t.end();
    });

    t.test('areaKeys skips certain keys', function(t) {
      t.notOk(ak.areaKeys.hasOwnProperty('area'), 'area');
      t.notOk(ak.areaKeys.hasOwnProperty('barrier'), 'barrier');
      t.notOk(ak.areaKeys.hasOwnProperty('highway'), 'highway');
      t.notOk(ak.areaKeys.hasOwnProperty('footway'), 'footway');
      t.notOk(ak.areaKeys.hasOwnProperty('railway'), 'railway');
      t.notOk(ak.areaKeys.hasOwnProperty('type'), 'type');
      t.end();
    });

    t.end();
  });

  t.test('isArea', function(t) {
    t.test('exports isArea', function(t) {
      t.type(ak.isArea, 'function');
      t.end();
    });

    t.test('natural=wood is an area', function(t) {
      t.ok(ak.isArea({ 'natural': 'wood' }));
      t.end();
    });

    t.test('natural=tree_row is not an area', function(t) {
      t.notOk(ak.isArea({ 'natural': 'tree_row' }));
      t.end();
    });

    t.test('area=yes is an area', function(t) {
      t.ok(ak.isArea({ 'natural': 'tree_row', 'area': 'yes' }));
      t.end();
    });

    t.test('area=no is not an area', function(t) {
      t.notOk(ak.isArea({ 'natural': 'wood', 'area': 'no' }));
      t.end();
    });

    t.end();
  });

  t.end();
});