import { test } from 'tap';
import { areaKeys, isArea } from '../index.mjs';

test('id-area-keys', t => {

  t.test('areaKeys', t => {
    t.test('exports areaKeys', t => {
      t.type(areaKeys, 'object');
      t.end();
    });

    t.test('areaKeys includes certain keys', t => {
      t.ok(areaKeys.hasOwnProperty('amenity'), 'amenity');
      t.ok(areaKeys.hasOwnProperty('building'), 'building');
      t.ok(areaKeys.hasOwnProperty('landuse'), 'landuse');
      t.ok(areaKeys.hasOwnProperty('leisure'), 'leisure');
      t.ok(areaKeys.hasOwnProperty('man_made'), 'man_made');
      t.ok(areaKeys.hasOwnProperty('natural'), 'natural');
      t.ok(areaKeys.hasOwnProperty('waterway'), 'waterway');
      t.end();
    });

    t.test('areaKeys includes certain discardlisted keys', t => {
      t.ok(areaKeys.amenity.hasOwnProperty('bench'), 'bench');
      t.ok(areaKeys.leisure.hasOwnProperty('track'), 'track');
      t.ok(areaKeys.man_made.hasOwnProperty('pipeline'), 'pipeline');
      t.ok(areaKeys.natural.hasOwnProperty('tree_row'), 'tree_row');
      t.ok(areaKeys.waterway.hasOwnProperty('river'), 'river');
      t.end();
    });

    t.test('areaKeys skips certain keys', t => {
      t.notOk(areaKeys.hasOwnProperty('area'), 'area');
      t.notOk(areaKeys.hasOwnProperty('barrier'), 'barrier');
      t.notOk(areaKeys.hasOwnProperty('highway'), 'highway');
      t.notOk(areaKeys.hasOwnProperty('footway'), 'footway');
      t.notOk(areaKeys.hasOwnProperty('railway'), 'railway');
      t.notOk(areaKeys.hasOwnProperty('type'), 'type');
      t.end();
    });

    t.end();
  });

  t.test('isArea', t => {
    t.test('exports isArea', t => {
      t.type(isArea, 'function');
      t.end();
    });

    t.test('natural=wood is an area', t => {
      t.ok(isArea({ 'natural': 'wood' }));
      t.end();
    });

    t.test('natural=tree_row is not an area', t => {
      t.notOk(isArea({ 'natural': 'tree_row' }));
      t.end();
    });

    t.test('area=yes is an area', t => {
      t.ok(isArea({ 'natural': 'tree_row', 'area': 'yes' }));
      t.end();
    });

    t.test('area=no is not an area', t => {
      t.notOk(isArea({ 'natural': 'wood', 'area': 'no' }));
      t.end();
    });

    t.end();
  });

  t.end();
});