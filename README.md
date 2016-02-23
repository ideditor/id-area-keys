## id-area-keys

This package contains the `areaKeys` data structure extracted from the
[OpenStreetMap iD Editor project](https://github.com/openstreetmap/iD).

Because of the open nature of OpenStreetMap tagging, iD will never have a
complete list of tags used in OSM, so we want it to have logic like "assume
that a closed way with an amenity tag is an area, unless the amenity
is one of these specific types".

The `areaKeys` data structure allows testing of such conditions.

The returned object L is a whitelist/blacklist of tags. A closed way
with a tag (k, v) is considered to be an area if `k in L && !(v in L[k])`
(see [`iD.Way#isArea()`](https://github.com/openstreetmap/iD/blob/master/js/id/core/way.js)).

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
