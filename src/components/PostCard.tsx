import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

interface PostCardProps {
  node: Node
}

const PostCard: React.FC<PostCardProps> = ({ node: { node: { frontmatter, parent } } }) => {
  const { title, date, images } = frontmatter
  const { image: { publicURL }, caption } = images[0]
  return (
    <Wrapper>
      <Link to={`/${parent.relativeDirectory}`}>
        <Image src={publicURL} alt={caption} />
        <Content>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </Content>
      </Link>
    </Wrapper>
  )
}

const Content = styled.div`
  position: absolute;
  bottom: 0;
  background-color: hsla(40deg 12% 98%);
  opacity: 65%;
  transition: opacity 5000ms;
  width: 100%;
  padding: 4px 8px;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
`

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
`

const Date = styled.p`
  font-weight: var(--font-weight-medium);
`

const Image = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius);
  transition: transform 500ms;
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  --border-radius: 4px;
  border-radius: var(--border-radius);

  &:hover ${Content} {
    opacity: 70%;
    transition: opacity 250ms;
  }

  &:hover ${Image} {
    transform: scale(1.1);
    transition: transform 250ms;
  }
`
export default PostCard
