import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Listing = styled.div`
  flex: 1;
  margin-left: 3rem;
`;

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
