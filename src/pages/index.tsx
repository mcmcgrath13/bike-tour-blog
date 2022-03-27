import React from 'react'
import {graphql, Link} from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostCard from '../components/PostCard';

interface Image {
  image: {
    id: string
    publicURL: string
  }
  caption?: string
}

export interface Node {
  node: {
    frontmatter: {
      date: string
      title: string
      images: Image[]
    }
    parent: {
      relativeDirectory: string
    }
  }
}

interface HomePageProps {
  data: {
    allMarkdownRemark: {
      edges: Node[]
    }
  }
}

const HomePage = ({ data }: HomePageProps) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout withHero={true}>
      <Wrapper>
        { posts.map(n => <PostCard node={n} />) }
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
  padding: 32px 0 16px;
`

export const query  = graphql`
query allPosts {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    edges {
      node {
        frontmatter {
          date(formatString: "dddd, MMMM Do, YYYY")
          images {
            caption
            image {
              id
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
`


export default HomePage
