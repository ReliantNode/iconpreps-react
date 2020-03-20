import styled from 'styled-components';
import Badge from 'components/Badge';
import { H2, H5, Text } from 'components/Typography';
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

export const LogoAndDetails = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const PRepDetails = styled.div`
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
    flex: 1;
    width: 20rem;
    padding: 0 3rem 0 1.5rem;

    ${Text} {
      margin-top: 0.8rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.xl}) {
    width: 30rem;
  }
`;

export const PRepName = styled(H2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PRepCategories = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
    border-top: 1px solid ${palette.gray.border};
    padding-top: 1rem;
    margin-top: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-left: 1px solid ${palette.gray.border};
    padding: 0 3rem;
  }
`;

export const PRepRank = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    border-top: 1px solid ${palette.gray.border};
    padding-top: 2rem;
    margin-top: 2rem;

    ${Badge} {
      margin-left: 2rem;
    }

    .rank-banner {
      display: none;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 2.5rem;
    border-left: 1px solid ${palette.gray.border};

    .rank-banner {
      margin-top: -33px;
      margin-left: -10px;
    }
  }
`;

export const PRepRankText = styled.div`
  display: flex;
  align-items: center;

  ${H5} {
    margin-left: 1.5rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: none;
  }
`;
