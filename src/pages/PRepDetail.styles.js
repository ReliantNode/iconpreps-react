import styled from 'styled-components';
import { H2, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

export const Header = styled.div`
  position: relative;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);

  @media screen and (max-width: ${breakpoints.max.md}) {
    padding: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    display: flex;
    justify-content: space-between;
    padding: 3rem 2.5rem;
  }
`;

export const LogoAndDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;

  @media screen and (max-width: ${breakpoints.max.md}) {
    margin-top: 3rem;
  }
`;

export const PRepDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    padding-left: 1.2rem;

    ${Text} {
      margin-top: 0.2rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    min-width: 20rem;
    padding: 0 3rem 0 1.5rem;

    ${Text} {
      margin-top: 0.8rem;
    }
  }
`;

export const PRepName = styled(H2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PRepStats = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoints.max.md}) {
    border-top: 1px solid ${palette.gray.border};
    padding-top: 2rem;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    border-left: 1px solid ${palette.gray.border};
    padding: 1.5rem 2rem;
  }
`;

export const PRepStat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-left: 1px solid ${palette.gray.border};

  &:first-child {
    border: none;
  }

  @media screen and (max-width: ${breakpoints.max.md}) {
    padding: 0 2rem;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    padding: 0 3rem;
  }
`;

export const PRepLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${breakpoints.max.md}) {
    border-top: 1px solid ${palette.gray.border};
    padding-top: 2rem;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.lg}) {
    border-left: 1px solid ${palette.gray.border};
    padding: 0 5rem;
  }
`;

export const PRepLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${palette.brand.primary};
  border-radius: 0.4rem;
  overflow: hidden;
  margin-left: 1rem;

  &:first-child {
    margin-left: 0;
  }
`;

export const LinkIcon = styled.img`
  width: 2rem;
`;

export const PRepRank = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-left: 2.5rem;
  border-left: 1px solid ${palette.gray.border};
`;

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 5rem 0;
`;
