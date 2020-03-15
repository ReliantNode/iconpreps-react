import styled from 'styled-components';
import banner from 'assets/banner.svg';
import { palette } from 'utils/designTokens';
import { Text } from 'components/Typography';

export const PRepDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 20rem;
  padding: 0 3rem 0 1.5rem;
`;

export const PRepCategories = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 3rem;
  border-left: 1px solid ${palette.gray.border};
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

export const RankBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${banner});
  background-size: cover;
  width: 49px;
  height: 72px;
  margin-top: -33px;
  margin-left: -10px;

  ${Text} {
    margin-top: -1.2rem;
    margin-left: 0.7rem;
  }
`;
