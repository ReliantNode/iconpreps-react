import styled from 'styled-components';
import banner from 'assets/banner.svg';
import { palette } from 'utils/designTokens';
import { Text } from 'components/Typography';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 3rem 2.5rem;
`;

export const PRepDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 20rem;
  padding: 0 3rem 0 1.5rem;
`;

export const PRepStats = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid ${palette.gray.border};
  padding: 1.5rem 2rem;
`;

export const PRepStat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  border-left: 1px solid ${palette.gray.border};

  &:first-child {
    border: none;
  }
`;

export const PRepLinks = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${palette.gray.border};
  padding: 0 2.5rem;
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

export const RankBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${banner});
  background-size: cover;
  width: 49px;
  height: 72px;
  margin-top: -38px;
  margin-left: -10px;

  ${Text} {
    margin-top: -1.2rem;
    margin-left: 0.7rem;
  }
`;

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 5rem 0;
`;
