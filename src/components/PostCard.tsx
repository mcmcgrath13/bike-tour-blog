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
  background-color: var(--color-gray-100);
  opacity: 70%;
  transition: opacity 1000ms;
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
`;

const Wrapper = styled.div`
  position: relative;
  --border-radius: 4px;
  border-radius: var(--border-radius);
  filter: drop-shadow(0.1rem 0.2rem 0.1rem hsla(28deg, 5%, 32%, 30%))
    drop-shadow(0.2rem 0.4rem 0.2rem hsla(28deg, 5%, 38%, 20%))
    drop-shadow(0.3rem 0.6rem 0.2rem hsla(28deg, 5%, 42%, 10%));

  &:hover ${Content} {
    opacity: 85%;
    transition: opacity 400ms;
  }
`;
export default PostCard;
