shp2json -n ~/Downloads/us_medium_shoreline/us_medium_shoreline.shp \
  | ndjson-filter "d.geometry.coordinates[0][0] > -83.9 && d.geometry.coordinates[0][0] < -75.68 && d.geometry.coordinates[0][1] > 41.4 && d.geometry.coordinates[0][1] < 46.4" \
  | ndjson-map "delete d.properties, d" \
  | geo2topo -n -q 1e5 \
  | toposimplify -p 10e-3 - \
> src/data/on_coast.json

#   | ndjson-reduce 'p.features.push(d), p' '{type: "FeatureCollection", features: []}' \
