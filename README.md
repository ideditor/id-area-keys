[![build](https://github.com/osmlab/id-area-keys/workflows/build/badge.svg)](https://github.com/osmlab/id-area-keys/actions?query=workflow%3A%22build%22)
[![npm version](https://badge.fury.io/js/id-area-keys.svg)](https://badge.fury.io/js/id-area-keys)


# id-area-keys

### areaKeys

This package contains the `areaKeys` data structure extracted from the
[OpenStreetMap id-tagging-schema project](https://github.com/openstreetmap/id-tagging-schema).

Because of the open nature of OpenStreetMap tagging, there never be a
complete list of tags used in OSM, so we want it to have logic like "assume
that a closed way with an amenity tag is an area, unless the amenity
is one of these specific types".

The `areaKeys` data structure allows testing of such conditions.

The returned object L is a keeplist/discardlist of tags. A closed way
with a tag (k, v) is assumed to be an area if `k in L && !(v in L[k])`
(see [`iD.osmWay#isArea()`](https://github.com/openstreetmap/iD/blob/67407c508126ca9e9b59cfdb71882d0dd46804e1/modules/osm/way.js#L154)).

In other words, the keys of L form the keeplist, and the subkeys form the discardlist.

##### Example:

In this subset of the `areaKeys` data structure, we can see that any closed ways
with `landuse=*` or `leisure=*` are probably area
features.  But closed way _exceptions_ like `leisure=slipway` or `leisure=track`
are probably linear features.

```js
{
  "areaKeys": {
    ...
    "landuse": { },
    "leisure": {
      "slipway": true,
      "track": true
    },
    ...
  }
}
```


### isArea

This package also includes `isArea` utility function for testing
an OpenStreetMap object against the area list.  The `isArea` function
accepts an `Object` of tags, and returns `true` if those tags imply
an area feature, or `false` if those tags imply a linear feature.

##### Example:

```js
import { isArea } from 'id-area-keys';

isArea({ 'natural': 'wood' });
// true - a closed way tagged `natural=wood` is an area filled with trees

isArea({ 'natural': 'tree_row' });
// false - a closed way tagged `natural=tree_row` is a linear ring of trees
```


### area=yes / area=no

In OpenStreetMap, an `area` tag can be used to force or disambiguate whether
a closed way should be treated as a filled area (`area=yes`) or as a linear
ring (`area=no`).

Because `area` tags override the other tags, an `area` key does not appear
in `areaKeys` data structure, and users of this library must either handle
`area=yes`/`area=no` tags in their own code, or use this library's exported
[`isArea` function](#isarea), which does contain code to handle `area=yes`/`area=no`.



### License

id-area-keys is available under the [ISC License](https://opensource.org/licenses/ISC).


### Version

To keep things simple, the released version of id-area-keys is pinned to a
[recently released version of the iD presets](https://github.com/openstreetmap/id-tagging-schema).
