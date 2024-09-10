import json from './dist/areaKeys.json' with {type: 'json'};
export let { areaKeys } = json;

/**
 * Test if the given OpenStreetMap tags imply that a
 * closed way should be treated as an area.
 *
 * @param   {Object}   Object of tags to test
 * @returns {boolean}  true if tags imply area, false if they do not
 * @example
 *   import { isArea } from 'id-area-keys';
 *
 *   isArea({ 'natural': 'wood' });
 *    // true - a closed way tagged `natural=wood` is an area filled with trees
 *   isArea({ 'natural': 'tree_row' });
 *    // false - a closed way tagged `natural=tree_row` is a linear ring of trees
 */
export function isArea(tags) {
  if (typeof tags !== 'object') return false;
  if (tags.area === 'yes') return true;
  if (tags.area === 'no')  return false;

  for (let key in tags) {
    if (key in areaKeys && !(tags[key] in areaKeys[key])) return true;
  }

  return false;
}
