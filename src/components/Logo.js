import styled from 'styled-components';
import { breakpoints, palette } from 'utils/designTokens';

export const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: none;
  border: 1px solid ${palette.gray.border};
  border-radius: 100%;
  overflow: hidden;

  @media screen and (min-width: ${breakpoints.min.md}) {
    width: 7.5rem;
    height: 7.5rem;
    border: 2px solid ${palette.gray.border};
  }
`;

export const Logo = styled.img`
  min-width: 100%;
`;
