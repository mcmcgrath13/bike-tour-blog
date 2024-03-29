import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import { QUERIES } from "../constants";

import Layout from "../components/Layout";
import PostImages from "../components/PostImages";
import MarkdownContent from "../components/MarkdownContent";
import LocationMap from "../components/LocationMap";

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

interface DirectoryNode {
  next: {
    base: string | null;
  };
  node: {
    base: string;
  };
  previous: {
    base: string | null;
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
      parent: {
        relativeDirectory: string;
      };
    };
    allDirectory: {
      edges: DirectoryNode[];
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
      parent: { relativeDirectory },
      html,
    },
    allDirectory,
    allMarkdownRemark: { edges },
  },
}) => {
  console.log(allDirectory);
  const coordinates = JSON.parse(location.coordinates).coordinates;
  const totalMiles = edges
    .filter((e) => e.node.frontmatter.postDate <= rawDate)
    .map((e) => e.node.frontmatter.postMiles)
    .reduce((a, b) => a + b, 0);

  const directoryInfo = allDirectory.edges.find(
    (d) => d.node.base === relativeDirectory
  );
  const nextPage = directoryInfo?.next?.base;
  const prevPage = directoryInfo?.previous?.base;

  return (
    <Layout description={title}>
      <PostImages images={images} />
      <Wrapper>
        <LocationMapWrapperTablet>
          <LocationMap latitude={coordinates[1]} longitude={coordinates[0]} />
        </LocationMapWrapperTablet>
        <Title>{title}</Title>
        <SubTitle>{date}</SubTitle>
        <LocationMapWrapperMobile>
          <LocationMap latitude={coordinates[1]} longitude={coordinates[0]} />
        </LocationMapWrapperMobile>
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
        <Divider />
        <PageLinks>
          <LinkWrapper>
            {prevPage && prevPage !== "blog" && (
              <Link to={"/" + prevPage}>Previous</Link>
            )}
          </LinkWrapper>
          <LinkWrapper>
            {nextPage && <Link to={"/" + nextPage}>Next</Link>}
          </LinkWrapper>
        </PageLinks>
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

const LocationMapWrapperMobile = styled.div`
  margin: 0 auto;
  width: fit-content;
  margin-top: -1.5rem;
  margin-bottom: 1rem;

  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

const LocationMapWrapperTablet = styled.div`
  display: none;

  @media ${QUERIES.tabletAndUp} {
    display: revert;
    float: right;
    margin-top: 0.5rem;
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const Divider = styled.hr`
  margin-top: 2rem;
`;
const PageLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;
const LinkWrapper = styled.div`
  font-weight: var(--font-weight-medium);
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
    allDirectory {
      edges {
        next {
          base
        }
        node {
          base
        }
        previous {
          base
        }
      }
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
