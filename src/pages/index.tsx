import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

interface HomePageProps {
  data: {
    allMarkdownRemark: {
      edges: Node[];
    };
  };
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout
      withHero
      description="Mary Bikes cross country from Rhode Island to Washington - summer 2023"
    >
      <Wrapper>
        {posts.map((n) => (
          <PostCard key={n.node.parent.relativeDirectory} node={n} />
        ))}
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  padding: var(--gutter);
`;

export const query = graphql`
  query allPosts {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            date(formatString: "dddd, MMMM Do, YYYY")
            images {
              caption
              image {
                publicURL
              }
            }
            title
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

export default HomePage;
