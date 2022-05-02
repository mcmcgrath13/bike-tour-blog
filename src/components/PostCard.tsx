import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

interface PostCardProps {
  node: Node;
}

const PostCard: React.FC<PostCardProps> = ({
  node: {
    node: { frontmatter, parent },
  },
}) => {
  const { title, date, images } = frontmatter;
  const {
    image: { publicURL },
    caption,
  } = images[0];
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
  );
};

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
  backdrop-filter: blur(8px);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
`;

const Date = styled.p`
  font-weight: var(--font-weight-medium);
`;

const Image = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: var(--border-radius);
  transition: transform 600ms;
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  --border-radius: 4px;
  border-radius: var(--border-radius);
  filter: drop-shadow(1px 2px 1px hsla(28deg, 5%, 32%, 30%))
    drop-shadow(2px 4px 2px hsla(28deg, 5%, 38%, 20%))
    drop-shadow(3px 6px 2px hsla(28deg, 5%, 42%, 10%));

  &:hover ${Content} {
    opacity: 75%;
    transition: opacity 400ms;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover ${Image} {
      transform: scale(1.1);
      transition: transform 400ms;
    }
  }
`;
export default PostCard;
