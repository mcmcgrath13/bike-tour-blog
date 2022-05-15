import React, { useRef, useLayoutEffect } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import embed from "vega-embed";
import { Spec } from "vega";

import us10m from "../data/us-10m-topo.json";
import { COLORS } from "../constants";
import Layout from "../components/Layout";

interface LocationNode {
  node: {
    frontmatter: {
      date: string;
      location: Location;
      title: string;
    };
    parent: {
      relativeDirectory: string;
    };
  };
}

interface MapPageProps {
  data: {
    allMarkdownRemark: {
      edges: LocationNode[];
    };
  };
}

const MapPage: React.FC<MapPageProps> = ({ data }) => {
  const pointSize = 30;
  const pointDiameter = Math.sqrt(pointSize / Math.PI) * 2;

  const posts = data.allMarkdownRemark.edges.map((post) => {
    const { location, title, date } = post.node.frontmatter;
    const { relativeDirectory } = post.node.parent;
    const { town, state } = location;
    const [longitude, latitude] = JSON.parse(location.coordinates).coordinates;
    return {
      title,
      date,
      latitude,
      longitude,
      town,
      state,
      url: `/${relativeDirectory}`,
      offset: 0,
    };
  });

  posts.forEach((post, i) => {
    post.offset +=
      posts
        .slice(0, i)
        .filter((p) => p.town == post.town && p.state == post.state).length *
      (pointDiameter + 0.5);
  });

  const el = useRef<HTMLDivElement>(null);

  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    background: "transparent",

    data: [
      {
        name: "states",
        values: us10m,
        format: {
          type: "topojson",
          feature: "us-10m",
        },
      },
      {
        name: "posts",
        values: posts,
        transform: [
          {
            type: "geopoint",
            projection: "projection",
            fields: ["longitude", "latitude"],
          },
        ],
      },
    ],

    projections: [
      {
        name: "projection",
        type: "albersUsa",
        size: { signal: "[width, height]" },
        fit: { signal: 'data("states")' },
      },
    ],

    marks: [
      {
        type: "shape",
        from: { data: "states" },
        encode: {
          enter: {
            strokeWidth: { value: 1 },
            stroke: { value: COLORS.gray[300] },
            fill: { value: COLORS.white },
          },
        },
        transform: [{ type: "geoshape", projection: "projection" }],
      },

      {
        type: "line",
        from: { data: "posts" },
        encode: {
          enter: {
            stroke: { value: COLORS.gray[700] },
            strokeWidth: { value: 1 },
            interpolate: { value: "monotone" },
          },
          update: {
            x: { field: "x" },
            y: { field: "y" },
          },
        },
      },

      {
        type: "symbol",
        from: { data: "posts" },
        encode: {
          enter: {
            size: { value: pointSize },
            fill: { value: COLORS.urgent },
          },
          update: {
            x: { signal: "datum.x + datum.offset" },
            y: { field: "y" },
          },
        },
      },

      {
        type: "symbol",
        from: { data: "posts" },
        encode: {
          enter: {
            size: { value: pointSize * 2.5 },
            fill: { value: "transparent" },
            cursor: { value: "pointer" },
          },
          update: {
            x: { signal: "datum.x + datum.offset" },
            y: { field: "y" },
            href: { field: "url" },
            tooltip: {
              signal: `{'title': datum.title, 'Date': datum.date, 'Location': datum.town + ', ' + datum.state}`,
            },
          },
        },
      },
    ],
  } as Spec;

  useLayoutEffect(() => {
    if (el.current) {
      embed(el.current, spec, {
        mode: "vega",
        actions: false,
      }).then(({ view }) => {
        view
          .width(el.current.clientWidth)
          .height(el.current.clientHeight)
          .resize()
          .run();
      });
    }
  }, [spec]);

  return (
    <Layout
      withHero
      description="Mary bikes cross country from Rhode Island to Washington - summer 2023"
    >
      <Wrapper>
        <MapWrapper ref={el}></MapWrapper>
      </Wrapper>
    </Layout>
  );
};

const MapWrapper = styled.div`
  width: 100%;
  height: 60vw;
`;

const Wrapper = styled.div`
  padding: var(--gutter);
`;

export const query = graphql`
  query allPostLocations {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "dddd, MMMM Do, YYYY")
            title
            location {
              coordinates
              state
              town
            }
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  }
`;

export default MapPage;