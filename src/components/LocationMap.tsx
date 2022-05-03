import React, { useRef, useLayoutEffect } from "react";
import embed, { VisualizationSpec } from "vega-embed";

import us10m from "../data/us-10m-topo-simple.json";
import { COLORS } from "../constants";

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const el = useRef<HTMLDivElement>(null);

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 200,
    height: 150,
    projection: {
      type: "albers",
    },
    background: "transparent",
    layer: [
      {
        data: {
          values: us10m,
          format: {
            type: "topojson",
            feature: "us-10m",
          },
        },
        mark: {
          type: "geoshape",
          fill: COLORS.white,
          stroke: COLORS.gray[300],
        },
      },
      {
        data: {
          values: [
            {
              longitude,
              latitude,
            },
          ],
        },
        encoding: {
          longitude: {
            field: "longitude",
            type: "quantitative",
          },
          latitude: {
            field: "latitude",
            type: "quantitative",
          },
        },
        layer: [
          {
            mark: {
              type: "circle",
              color: COLORS.urgent,
              opacity: 0.8,
              size: 45,
            },
          },
        ],
      },
    ],
  };

  useLayoutEffect(() => {
    if (el.current) {
      embed(el.current, spec, {
        mode: "vega-lite",
        actions: false,
      });
    }
  }, [spec]);

  return <div ref={el} />;
};

export default LocationMap;
