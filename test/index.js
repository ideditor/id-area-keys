'use strict';

var test = require('tap').test;
var ak = require('../.');

test('id-area-keys', function(t) {

    t.test('areaKeys', function(t) {
        t.test('exports areaKeys', function(t) {
            t.type(ak.areaKeys, 'object');
            t.end();
        });

        t.test('areaKeys includes certain keys', function(t) {
            t.true(ak.areaKeys.hasOwnProperty('amenity'), 'amenity');
            t.true(ak.areaKeys.hasOwnProperty('building'), 'building');
            t.true(ak.areaKeys.hasOwnProperty('landuse'), 'landuse');
            t.true(ak.areaKeys.hasOwnProperty('leisure'), 'leisure');
            t.true(ak.areaKeys.hasOwnProperty('man_made'), 'man_made');
            t.true(ak.areaKeys.hasOwnProperty('natural'), 'natural');
            t.true(ak.areaKeys.hasOwnProperty('waterway'), 'waterway');
            t.end();
        });

        t.test('areaKeys includes certain discardlisted keys', function(t) {
            t.true(ak.areaKeys.amenity.hasOwnProperty('bench'), 'bench');
            t.true(ak.areaKeys.leisure.hasOwnProperty('track'), 'track');
            t.true(ak.areaKeys.man_made.hasOwnProperty('pipeline'), 'pipeline');
            t.true(ak.areaKeys.natural.hasOwnProperty('tree_row'), 'tree_row');
            t.true(ak.areaKeys.waterway.hasOwnProperty('river'), 'river');
            t.end();
        });

        t.test('areaKeys skips certain keys', function(t) {
            t.false(ak.areaKeys.hasOwnProperty('area'), 'area');
            t.false(ak.areaKeys.hasOwnProperty('barrier'), 'barrier');
            t.false(ak.areaKeys.hasOwnProperty('highway'), 'highway');
            t.false(ak.areaKeys.hasOwnProperty('footway'), 'footway');
            t.false(ak.areaKeys.hasOwnProperty('railway'), 'railway');
            t.false(ak.areaKeys.hasOwnProperty('type'), 'type');
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
            t.true(ak.isArea({ 'natural': 'wood' }));
            t.end();
        });

        t.test('natural=tree_row is not an area', function(t) {
            t.false(ak.isArea({ 'natural': 'tree_row' }));
            t.end();
        });

        t.test('area=yes is an area', function(t) {
            t.true(ak.isArea({ 'natural': 'tree_row', 'area': 'yes' }));
            t.end();
        });

        t.test('area=no is not an area', function(t) {
            t.false(ak.isArea({ 'natural': 'wood', 'area': 'no' }));
            t.end();
        });

        t.end();
    });

    t.end();
});
