[![npm version](https://badge.fury.io/js/id-area-keys.svg)](https://badge.fury.io/js/id-area-keys)
[![Build Status](https://circleci.com/gh/osmlab/id-area-keys/tree/master.svg?style=shield)](https://circleci.com/gh/osmlab/id-area-keys)

# id-area-keys


This package contains the `areaKeys` data structure extracted from the
[OpenStreetMap iD Editor project](https://github.com/openstreetmap/iD).

Because of the open nature of OpenStreetMap tagging, iD will never have a
complete list of tags used in OSM, so we want it to have logic like "assume
that a closed way with an amenity tag is an area, unless the amenity
is one of these specific types".

The `areaKeys` data structure allows testing of such conditions.

The returned object L is a whitelist/blacklist of tags. A closed way
with a tag (k, v) is assumed to be an area if `k in L && !(v in L[k])`
(see [`iD.osmWay#isArea()`](https://github.com/openstreetmap/iD/blob/67407c508126ca9e9b59cfdb71882d0dd46804e1/modules/osm/way.js#L154)).

In other words, the keys of L form the whitelist, and the subkeys form the blacklist.


### Usage:
```js

var areaKeys = require('id-area-keys').areaKeys;

function isArea(way) {
    if (way.tags.area === 'yes')
        return true;
    if (!way.isClosed() || way.tags.area === 'no')
        return false;
    for (var key in way.tags)
        if (key in areaKeys && !(way.tags[key] in areaKeys[key]))
            return true;
    return false;
}

```


### License

iD is available under the [ISC License](https://opensource.org/licenses/ISC).


### Version

To keep things simple, the current version of id-area-keys is pinned to the
[currently released version of iD](https://github.com/openstreetmap/iD/releases).
