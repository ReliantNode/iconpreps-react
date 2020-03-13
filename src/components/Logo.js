import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const LogoWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  background: ${({ children }) => (!children ? palette.brand.primary : 'none')};
  border: 2px solid ${palette.gray.border};
  border-radius: 7.5rem;
  overflow: hidden;
`;

export const Logo = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;
