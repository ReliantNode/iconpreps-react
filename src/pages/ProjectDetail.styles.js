import { Link } from '@reach/router';
import styled from 'styled-components';
import { H6, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Container = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
  }
  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const Main = styled.div`
  flex: 1;
`;

export const Sidebar = styled.div`
  width: 36rem;
  margin-left: 3rem;
`;

export const Card = styled.div`
  position: relative;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);

  @media screen and (max-width: ${breakpoints.max.sm}) {
    padding: 2rem;
    margin-top: 2.5rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    padding: 3rem;
    margin-top: 3rem;
  }
`;

export const Description = styled(Text)`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-top: 1.5rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 2rem;
  }
`;

export const ProjectOverview = styled.div`
  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    min-height: 5.5rem;
    margin-top: 2.5rem;
  }
`;

export const ProjectOverviewItem = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    border: none;
  }

  @media screen and (max-width: ${breakpoints.max.sm}) {
    align-items: flex-start;
    border-top: 1px solid ${palette.gray.border};
    padding: 2rem 0;

    &:last-child {
      padding-bottom: 0;
    }

    ${H6} {
      margin-bottom: 2rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    justify-content: space-between;
    border-left: 1px solid ${palette.gray.border};
    padding: 0 3rem;
  }
`;

export const PRepDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-top: 2.5rem;

    ${Text} {
      margin-top: 0.2rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 1.5rem;

    ${Text} {
      margin-top: 0.5rem;
    }
  }
`;

export const PRepLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  text-decoration: none;
  color: ${palette.white};
  background: ${palette.brand.primary};
  border: none;
  border-radius: 0.4rem;
  margin-top: 3rem;
`;

export const RelatedProject = styled.div`
  border-top: 1px solid ${palette.gray.border};
  padding-top: 2rem;
  margin-top: 2rem;
`;

export const ProjectUpdate = styled.div`
  position: relative;
  padding-left: 3rem;
  padding-bottom: 3rem;
  &:last-child {
    padding-bottom: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0.4rem;
    left: 0;
    width: 1.2rem;
    height: 1.2rem;
    background: ${palette.white};
    border: 2px solid ${palette.brand.primary};
    border-radius: 100%;
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 2rem;
    bottom: 0;
    left: 0.5rem;
    width: 2px;
    background: ${palette.gray.bar};
    z-index: 1;
  }
`;

export const EmbeddedHTML = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.2rem;

  * {
    color: ${palette.black} !important;
  }

  p,
  ul {
    margin: 1.5rem 0 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin: 2rem 0 1rem;
  }
  h1,
  h2 {
    font-size: 1.7rem;
    line-height: 2.2rem;
  }
  h3,
  h4 {
    font-size: 1.5rem;
    line-height: 2.2rem;
  }
  h5,
  h6 {
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  a {
    font-weight: 600;
    color: unset;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    height: auto !important;
  }

  pre,
  code {
    white-space: pre-wrap;
  }
`;
