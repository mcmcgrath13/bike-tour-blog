import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import Footer from "./Footer";
import GlobalStyle from "./GlobalStyles";
import NavBar from "./NavBar";

import heroImage from "../images/cover.jpeg";

interface LayoutProps {
  withHero?: boolean;
  description: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  description,
  withHero = false,
}) => {
  return (
    <>
      <GlobalStyle />

      <Helmet>
        <title>Mary Bikes</title>
        <meta name="description" content={description}></meta>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Wrapper>
        <NavBar />

        {withHero && (
          <Hero>
            <Image src={heroImage} alt="TODO" />
          </Hero>
        )}

        <ContentWrapper>{children}</ContentWrapper>

        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: var(--color-gray-100);
`;

const ContentWrapper = styled.div`
  flex: 1;
  isolation: isolate;
`;

const Hero = styled.div`
  height: clamp(150px, 35vh, 700px);
  width: 100vw;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

export default Layout;
