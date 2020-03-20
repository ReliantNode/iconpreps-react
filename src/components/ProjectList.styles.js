import styled from 'styled-components';
import { Card as CommonCard } from 'components/Cards';
import { LogoWrapper } from 'components/Logo';
import { H2, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Listing = styled.div`
  flex: 1;
  min-width: 0;

  @media screen and (min-width: ${breakpoints.min.lg}) {
    margin-left: 3rem;
  }
`;

export const Filters = styled.div`
  @media screen and (max-width: ${breakpoints.max.md}) {
    display: ${({ showing }) => (showing ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100%;
    background: ${palette.white};
    z-index: 10;
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    display: block;
    flex-shrink: 0;
    width: 26rem;
    background: ${palette.white};
    border: 1px solid ${palette.gray.border};
    border-radius: 0.6rem;
    box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  }
`;

export const MessageText = styled(Text)`
  margin-top: 8rem;
  text-align: center;
`;

export const Card = styled(CommonCard)`
  @media screen and (min-width: ${breakpoints.min.md}) {
    display: block;
    padding-left: 12rem;
  }
`;

export const LogoAndHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    .rating {
      margin-top: 0.6rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    ${LogoWrapper} {
      position: absolute;
      left: 2rem;
      top: 2rem;
    }
    .rating {
      margin-top: 1rem;
    }
  }
`;

export const ProjectHeader = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 0;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-left: 1.2rem;
  }
`;

export const ProjectName = styled(H2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled(Text)`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin-top: 1.5rem;
  }
`;

export const ProjectMetaMobile = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: none;
  }
`;

export const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${palette.gray.border};

  @media screen and (max-width: ${breakpoints.max.sm}) {
    padding-top: 2rem;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    padding-top: 1.5rem;
    margin-top: 1.5rem;
  }
`;

export const ProjectMetaSeparator = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  width: 1px;
  background: ${palette.gray.border};

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin: 0 2.5rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    margin: 0 3rem;
  }
`;

export const ProjectRecent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    margin-left: 1.5rem;
  }
`;

export const Dot = styled.div`
  flex-shrink: 0;
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.8rem;
  margin-right: 1rem;
`;
