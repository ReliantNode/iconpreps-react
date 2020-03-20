import { Link } from '@reach/router';
import styled from 'styled-components';
import RawRankBanner from 'components/RankBanner';
import { H6, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Container = styled.div`
  @media screen and (min-width: ${breakpoints.min.lg}) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const Main = styled.div`
  flex: 1;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    .project-feedback {
      margin-top: 3rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    .project-feedback {
      margin-top: 5rem;
    }
  }
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

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin: 3rem 0;
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
    justify-content: flex-start;
    min-height: 5.5rem;
    margin-top: 2.5rem;
  }
`;

export const ProjectOverviewItem = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    align-items: flex-start;
    border-top: 1px solid ${palette.gray.border};
    padding: 2rem 0;

    &:first-child {
      border: none;
    }
    &:last-child {
      padding-bottom: 0;
    }

    ${H6} {
      margin-bottom: 2rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    justify-content: space-between;
  }
`;

export const OverviewSeparator = styled.div`
  align-self: stretch;
  width: 1px;
  background: ${palette.gray.border};
  margin: 0 3rem;
`;

export const RankBanner = styled(RawRankBanner)`
  position: absolute;
  top: -8px;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    right: 1.9rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    right: 2.9rem;
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
