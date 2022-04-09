import React from 'react';
import styled from 'styled-components'
import { Link } from 'gatsby'

import BikeIcon from '../images/bicycle-solid.inline.svg'
import MaxWidthWrapper from './MaxWidthWrapper';

const NavBar = () => {
  return (
    <BackgroundColor>
      <MaxWidthWrapper>
        <Wrapper>
          <Link to="/"><Title>Mary Bikes</Title></Link>
          <IconWrapper>
            <Link to="/"><BikeIcon /></Link>
          </IconWrapper>
        </Wrapper>
      </MaxWidthWrapper>
    </BackgroundColor>
  )
}

const BackgroundColor = styled.div`
  background: var(--color-primary);
`;

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  height: 5rem;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  /* header links should be unstyled */
  & > a {
    text-decoration: none;
  }
`

const Title = styled.h1`
  color: var(--color-light);
  font-size: 2rem;
  font-family: var(--font-family-logo);
`

const IconWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  color: var(--color-light);
`

export default NavBar;
