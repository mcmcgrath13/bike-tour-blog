import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostImages from '../components/PostImages'
import MarkdownContent from '../components/MarkdownContent'

interface PostProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string
        location: Location
        title: string
        images: PostImage[]
      }
      html: string
    }
  }
}

const Post: React.FC<PostProps> = ({
  data: {
    markdownRemark: {
      frontmatter: {
        date,
        location,
        title,
        images
      },
      html
    }
  }
}) => {
  const coordinates = JSON.parse(location.coordinates).coordinates

  return (
    <Layout>
      <PostImages images={images} />
      <Wrapper>
        <h1>{title}</h1>
        <ul>
          <li><strong>Latitude: </strong>{coordinates[0]}</li>
          <li><strong>Longitude: </strong>{coordinates[1]}</li>
        </ul>
        <MarkdownContent html={html} />
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.article`
  padding: var(--gutter);
  max-width: 60ch;
  margin: 0 auto;
`

export const query = graphql`
query ($id: String)  {
  markdownRemark(id: {eq: $id}) {
    parent {
      ... on File {
        relativeDirectory
      }
    }
    frontmatter {
      date
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
    }
    html
  }
}`

export default Post
