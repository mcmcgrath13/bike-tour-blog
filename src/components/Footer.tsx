import React from 'react';

import styled from 'styled-components'

const Footer = () => {
  const year = (new Date).getFullYear();

  return (
    <Wrapper>
      <p>©{year} <a href="https://github.com/mcmcgrath13">@mcmcgrath13</a></p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 7rem;
  background: var(--color-secondary);
  display: grid;
  place-content: center;
`

export default Footer;
