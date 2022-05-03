import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Layout";
import PostImages from "../components/PostImages";
import MarkdownContent from "../components/MarkdownContent";

const latLongString = (deg: number, lat: boolean) => {
  const absolute = Math.abs(deg);

  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  let direction;
  if (lat) {
    direction = deg >= 0 ? "N" : "S";
  } else {
    direction = deg >= 0 ? "E" : "W";
  }

  return degrees + "° " + minutes + "' " + seconds + '" ' + direction;
};

interface MilesNode {
  node: {
    frontmatter: {
      postMiles: number;
      postDate: string;
    };
  };
}

interface PostProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string;
        rawDate: string;
        location: Location;
        title: string;
        images: PostImage[];
        miles: number;
      };
      html: string;
    };
    allMarkdownRemark: {
      edges: MilesNode[];
    };
  };
}

const Post: React.FC<PostProps> = ({
  data: {
    markdownRemark: {
      frontmatter: { date, rawDate, location, title, images, miles },
      html,
    },
    allMarkdownRemark: { edges },
  },
}) => {
  const coordinates = JSON.parse(location.coordinates).coordinates;
  const totalMiles = edges
    .filter((e) => e.node.frontmatter.postDate <= rawDate)
    .map((e) => e.node.frontmatter.postMiles)
    .reduce((a, b) => a + b, 0);

  return (
    <Layout>
      <PostImages images={images} />
      <Wrapper>
        <Title>{title}</Title>
        <SubTitle>{date}</SubTitle>
        <Facts>
          <Fact>
            <strong>Location: </strong>
            {location.town}, {location.state}
          </Fact>
          <Fact>
            <strong>Longitude: </strong>
            {latLongString(coordinates[0], false)}
          </Fact>
          <Fact>
            <strong>Latitude: </strong>
            {latLongString(coordinates[1], true)}
          </Fact>
          <Fact>
            <strong>Miles Today: </strong>
            {miles}
          </Fact>
          <Fact>
            <strong>Total Miles: </strong>
            {totalMiles}
          </Fact>
        </Facts>
        <MarkdownContent html={html} />
      </Wrapper>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: 2rem;
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Fact = styled.li`
  display: inline-block;
  background: var(--color-light);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

const Wrapper = styled.article`
  padding: var(--gutter);
  max-width: calc(60ch + var(--gutter));
  margin: 0 auto;
`;

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      parent {
        ... on File {
          relativeDirectory
        }
      }
      frontmatter {
        date(formatString: "dddd, MMMM Do, YYYY")
        rawDate: date
        location {
          coordinates
          state
          town
        }
        title
        images {
          image {
            id
            publicURL
          }
          caption
        }
        miles
      }
      html
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            postDate: date
            postMiles: miles
          }
        }
      }
    }
  }
`;

export default Post;
