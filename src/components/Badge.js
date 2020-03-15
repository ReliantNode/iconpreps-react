import styled from 'styled-components';
import { palette } from 'utils/designTokens';

const Badge = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  padding: 0.3rem 1.5rem 0.4rem;
  border-radius: 1.5rem;
  background: ${palette.brand.background};
  color: ${palette.brand.primary};
  white-space: nowrap;
`;

export default Badge;
