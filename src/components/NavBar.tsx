import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import BikeIcon from '../images/bicycle-solid.inline.svg'

const NavBar: React.FC = () => {
  return (
    <Wrapper>
      <Link to='/'><Title>Mary Bikes</Title></Link>
      <IconWrapper>
        <Link to='/'><BikeIcon /></Link>
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  position: sticky;
  isolation: isolate;
  z-index: 1;
  top: 0;
  height: 5rem;
  padding: 12px var(--gutter);
  background: var(--color-primary);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  filter:
    drop-shadow(1px 2px 2px hsla(28deg, 5%, 12%, 40%))
    drop-shadow(2px 4px 3px hsla(28deg, 5%, 14%, 30%))
    drop-shadow(3px 6px 4px hsla(28deg, 5%, 16%, 20%));

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

export default NavBar
