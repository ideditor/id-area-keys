import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { areaKeys, isArea } from '../dist/areaKeys.mjs';

test('id-area-keys', async t => {

  await t.test('areaKeys', async t => {
    await t.test('exports areaKeys', t => {
      assert.ok(areaKeys instanceof Object);
    });

    await t.test('areaKeys includes certain keys', t => {
      assert.equal(true, areaKeys.hasOwnProperty('amenity'), 'amenity');
      assert.equal(true, areaKeys.hasOwnProperty('building'), 'building');
      assert.equal(true, areaKeys.hasOwnProperty('landuse'), 'landuse');
      assert.equal(true, areaKeys.hasOwnProperty('leisure'), 'leisure');
      assert.equal(true, areaKeys.hasOwnProperty('man_made'), 'man_made');
      assert.equal(true, areaKeys.hasOwnProperty('natural'), 'natural');
      assert.equal(true, areaKeys.hasOwnProperty('waterway'), 'waterway');
    });

    await t.test('areaKeys includes certain discardlisted keys', t => {
      assert.equal(true, areaKeys.amenity.hasOwnProperty('bench'), 'bench');
      assert.equal(true, areaKeys.leisure.hasOwnProperty('track'), 'track');
      assert.equal(true, areaKeys.man_made.hasOwnProperty('pipeline'), 'pipeline');
      assert.equal(true, areaKeys.natural.hasOwnProperty('tree_row'), 'tree_row');
      assert.equal(true, areaKeys.waterway.hasOwnProperty('river'), 'river');
    });

    await t.test('areaKeys skips certain keys', t => {
      assert.equal(false, areaKeys.hasOwnProperty('area'), 'area');
      assert.equal(false, areaKeys.hasOwnProperty('barrier'), 'barrier');
      assert.equal(false, areaKeys.hasOwnProperty('highway'), 'highway');
      assert.equal(false, areaKeys.hasOwnProperty('footway'), 'footway');
      assert.equal(false, areaKeys.hasOwnProperty('railway'), 'railway');
      assert.equal(false, areaKeys.hasOwnProperty('type'), 'type');
    });
  });

  await t.test('isArea', async t => {
    await t.test('exports isArea', t => {
      assert.ok(isArea instanceof Function);
    });

    await t.test('natural=wood is an area', t => {
      const result = isArea({ 'natural': 'wood' });
      assert.equal(result, true);
    });

    await t.test('natural=tree_row is not an area', t => {
      const result = isArea({ 'natural': 'tree_row' });
      assert.equal(result, false);
    });

    await t.test('area=yes is an area', t => {
      const result = isArea({ 'natural': 'tree_row', 'area': 'yes' });
      assert.equal(result, true);
    });

    await t.test('area=no is not an area', t => {
      const result = isArea({ 'natural': 'tree_row', 'area': 'no' });
      assert.equal(result, false);
    });
  });

});