import styled from 'styled-components';
import { palette } from 'utils/designTokens';

export const Text = styled.p`
  font-size: ${({ small }) => (small ? 1.3 : 1.5)}rem;
  line-height: ${({ small }) => (small ? 1.8 : 2.2)}rem;
  color: ${({ muted }) => (muted ? palette.gray.text : palette.black)};
  margin: 0;
`;

export const A = styled.a`
  font-weight: 500;
  color: unset;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const H1 = styled.h1`
  font-weight: 600;
  font-size: 2.6rem;
  line-height: 3.6rem;
  margin: 0;
`;

export const H2 = styled.h2`
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.2rem;
  margin: 0;
`;
