import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import Layout from "../components/Layout";

import BikeIcon from "../images/bicycle-solid.inline.svg";
import MapIcon from "../images/map-solid.inline.svg";

const ErrorPage: React.FC = () => {
  return (
    <Layout description="Mary bikes cross country from Rhode Island to Washington - summer 2023">
      <Wrapper>
        <Title>404</Title>
        <SubTitle>You&apos;re lost!</SubTitle>
        <Icons>
          <Link to="/">
            <IconWrapper>
              <BikeIcon />
            </IconWrapper>
            <IconText>Go home</IconText>
          </Link>

          <Link to="/map">
            <IconWrapper>
              <MapIcon />
            </IconWrapper>
            <IconText>Look at a map</IconText>
          </Link>
        </Icons>
      </Wrapper>
    </Layout>
  );
};

const Icons = styled.div`
  display: grid;
  width: 100%;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  text-align: center;
  margin-top: 2rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 4rem;
  font-family: var(--font-family-logo);
`;

const SubTitle = styled.p`
  color: var(--color-primary);
  font-size: 2rem;
`;

const IconWrapper = styled.span`
  display: inline-block;
  height: 5rem;
  width: 5rem;
  color: var(--color-primary);
`;

const IconText = styled.p`
  color: var(--color-primary);
  font-size: 2rem;
`;

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  place-content: center;
  justify-items: center;
  grid-template-columns: minmax(200px, 1fr);
  width: 100%;
  min-height: 80vh;
  padding: var(--gutter);
`;

export default ErrorPage;
