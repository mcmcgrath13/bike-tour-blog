import React, { useRef, useLayoutEffect } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import embed from "vega-embed";
import { Spec } from "vega";

import us10m from "../data/us-10m-topo-detail.json";
import coastlines from "../data/on_coast.json";
import { COLORS } from "../constants";
import Layout from "../components/Layout";

interface LocationNode {
  node: {
    frontmatter: {
      date: string;
      location: Location;
      title: string;
      miles: number;
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

const clampAngle = (angle) => {
  return angle < -180 ? angle + 360 : angle > 180 ? angle - 360 : angle;
};

const MapPage: React.FC<MapPageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map((post) => {
    const { location, title, date, miles } = post.node.frontmatter;
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
      offsetAxis: "x",
      offsetMultiplier: 1,
      miles,
    };
  });

  posts.forEach((post, i) => {
    post.offset += posts
      .slice(i + 1)
      .filter((p) => p.town == post.town && p.state == post.state).length;

    // figure out which direction the offset should go in
    if (post.offset > 0) {
      const nextPost = posts
        .slice(0, i)
        .reverse()
        .find((p) => p.town !== post.town || p.state !== post.state);
      const prevPost = posts
        .slice(i + 1)
        .find((p) => p.town !== post.town || p.state !== post.state);

      // don't need to worry about missing previous post given the dataset
      if (!nextPost) {
        if (
          prevPost.latitude - post.latitude <
          prevPost.longitude - post.longitude
        ) {
          post.offsetAxis = "y";
          if (prevPost.latitude < post.latitue) {
            post.offsetMultiplier = -1;
          }
        }
      } else {
        const nextAngle =
          (Math.atan2(
            nextPost.latitude - post.latitude,
            nextPost.longitude - post.longitude
          ) *
            180) /
          Math.PI;
        const prevAngle =
          (Math.atan2(
            prevPost.latitude - post.latitude,
            prevPost.longitude - post.longitude
          ) *
            180) /
          Math.PI;

        const angleDelta = clampAngle(nextAngle - prevAngle);
        const avgAngle = clampAngle(prevAngle + angleDelta / 2);

        if (avgAngle >= -135 && avgAngle < -45) {
          post.offsetAxis = "y";
          post.offsetMultiplier = -1;
        } else if (avgAngle >= -45 && avgAngle < 45) {
          post.offsetAxis = "x";
          post.offsetMultiplier = -1;
        } else if (avgAngle >= 45 && avgAngle < 135) {
          post.offsetAxis = "y";
        } else {
          post.offsetAxis = "x";
        }
      }
    }
  });

  const el = useRef<HTMLDivElement>(null);

  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    background: "transparent",

    signals: [
      {
        name: "pointWidth",
        update: "max(3.5, width * .006)",
      },
      {
        name: "pointStroke",
        update: "max(1, width * .0012)",
      },
      {
        name: "pointSize",
        update: "pow(pointWidth - pointStroke, 2)",
      },
    ],

    data: [
      {
        name: "outlines",
        values: coastlines,
        format: {
          type: "topojson",
          feature: "-",
        },
      },
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
      {
        name: "linePosts",
        from: "posts",
        transform: [
          {
            type: "filter",
            expr: "datum.offset === 0",
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
        from: { data: "outlines" },
        encode: {
          enter: {
            strokeWidth: { value: 1 },
            stroke: { value: "#d3d3d3" },
          },
        },
        transform: [{ type: "geoshape", projection: "projection" }],
      },

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
        from: { data: "linePosts" },
        encode: {
          enter: {
            stroke: { value: COLORS.gray[700] },
            interpolate: { value: "monotone" },
          },
          update: {
            strokeWidth: { signal: "pointStroke" },
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
            stroke: { value: COLORS.urgent },
            fill: {
              signal: `datum.miles === 0 ? 'transparent' : '${COLORS.urgent}'`,
            },
          },
          update: {
            strokeWidth: { signal: "pointStroke" },
            size: { signal: "pointSize" },
            x: {
              signal:
                "datum.offsetAxis === 'x' ? datum.x + datum.offset * pointWidth * datum.offsetMultiplier : datum.x",
            },
            y: {
              signal:
                "datum.offsetAxis === 'y' ? datum.y + datum.offset * pointWidth * datum.offsetMultiplier : datum.y",
            },
            href: { field: "url" },
            tooltip: {
              signal: `{'title': datum.title, 'Date': datum.date, 'Location': datum.town + ', ' + datum.state}`,
            },
          },
        },
      },
    ],
  } as Spec;

  const getWidth = () => {
    return el.current?.clientWidth ?? 400;
  };

  const getHeight = () => {
    return el.current?.clientHeight ?? 400;
  };

  const resizeView = (view) => {
    view.width(getWidth()).height(getHeight()).resize().run();
  };

  useLayoutEffect(() => {
    if (el.current) {
      embed(el.current, spec, {
        mode: "vega",
        actions: false,
      }).then(({ view }) => {
        let timeout: number;
        resizeView(view);
        window.onresize = () => {
          // If there's a timer, cancel it
          if (timeout) {
            window.clearTimeout(timeout);
          }
          timeout = window.setTimeout(() => {
            // Run our resize functions
            resizeView(view);
          }, 100);
        };
      });
    }
  }, [spec]);

  return (
    <Layout
      withHero
      description="Mary bikes cross country from Rhode Island to Washington - Summer 2022"
    >
      <Wrapper>
        <Title>Where has Mary been?</Title>
        <SubTitle>
          Each point on the map is a location Mary has been on her bike. Select
          a point to see the corresponding post.
        </SubTitle>
      </Wrapper>
      <Wrapper>
        <MapWrapper ref={el}></MapWrapper>
      </Wrapper>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 0rem;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: var(--font-weight-normal);
  margin-bottom: calc(-1 * var(--gutter) + 0.5rem);
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 60vw;
`;

const Wrapper = styled.div`
  margin: var(--gutter);
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
            miles
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
