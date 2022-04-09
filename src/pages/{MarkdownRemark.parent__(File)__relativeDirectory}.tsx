import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import PostImages from '../components/PostImages'
import MaxWidthWrapper from '../components/MaxWidthWrapper'

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
      <MaxWidthWrapper>
        <Wrapper>
          <h1>{title}</h1>
          <ul>
            <li><strong>Latitude: </strong>{coordinates[0]}</li>
            <li><strong>Longitude: </strong>{coordinates[1]}</li>
          </ul>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Wrapper>
      </MaxWidthWrapper>
    </Layout>
  )
}

const Wrapper = styled.article`
  padding: var(--gutter);
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
