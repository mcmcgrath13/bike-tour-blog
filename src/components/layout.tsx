import React from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import GlobalStyle from './GlobalStyles';
import NavBar from './NavBar';

import heroImage from '../images/cover.jpeg';

const Layout = ({ children, withHero = false }) => {
  return (
    <React.Fragment>
      <GlobalStyle />

      <Wrapper>
        <NavBar />

        { withHero &&
          <Hero>
            <Image src={heroImage} alt="TODO" />
          </Hero>
        }

        <ContentWrapper>
          {children}
        </ContentWrapper>

        <Footer />
      </Wrapper>
    </React.Fragment>
  )
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: var(--color-gray-100);
`

const ContentWrapper = styled.div`
  flex: 1;
`

const Hero = styled.div`
  height: clamp(150px, 25vh, 500px);
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`

export default Layout;
