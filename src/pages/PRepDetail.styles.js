import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 3rem 2.5rem;
`;

export const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 5rem 0;
`;
