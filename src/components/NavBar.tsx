import React from 'react';
import styled from 'styled-components'
import { Link } from 'gatsby'

import BikeIcon from '../images/bicycle-solid.inline.svg'

const NavBar = () => {
  return (
    <Wrapper>
      <Link to="/"><Title>Mary Bikes</Title></Link>
      <IconWrapper>
        <Link to="/"><BikeIcon /></Link>
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  height: 5rem;
  background: var(--color-primary);
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
