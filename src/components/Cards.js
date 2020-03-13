import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const CardList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Card = styled.li`
  display: flex;
  justify-content: space-between;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  margin: 2rem 0 0;
  padding: 2.5rem;

  &:first-child {
    margin: 0;
  }
`;
