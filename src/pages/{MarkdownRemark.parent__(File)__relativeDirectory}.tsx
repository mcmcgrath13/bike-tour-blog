import React from 'react'
import {graphql} from 'gatsby'
import styled from 'styled-components'

interface Image {
  image: {
    id: string
    publicURL: string
  }
  caption?: string
}

interface PostProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string
        location: {
          coordinates: string
          state: string
          town: string
        }
        title: string
        images: Image[]
      },
      html: string
    }
  }
}

const Post = ({
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
}: PostProps) => {
  const coordinates = JSON.parse(location.coordinates).coordinates

  return (
    <div>
      <h1>{ title }</h1>
      <ul>
        <li><strong>Latitude: </strong>{coordinates[0]}</li>
        <li><strong>Longitude: </strong>{coordinates[1]}</li>
      </ul>
      { images.map(({image: {publicURL, id}, caption}) => <ImageWrapper><Image key={id} src={publicURL} alt={caption} /></ImageWrapper> )}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>)
}

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const query  = graphql`
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
