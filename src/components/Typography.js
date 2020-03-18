import styled from 'styled-components';
import { Link } from '@reach/router';
import { palette } from 'utils/designTokens';

export const Text = styled.p`
  font-weight: ${({ heavy }) => (heavy ? 600 : 400)};
  font-size: ${({ small }) => (small ? 1.3 : 1.5)}rem;
  line-height: ${({ small }) => (small ? 1.8 : 2.2)}rem;
  color: ${({ error, muted }) => (error ? palette.red : muted ? palette.gray.dark : palette.black)};
  margin: 0;
`;

export const A = styled.a`
  font-weight: 500;
  color: unset;
  text-decoration: none;

  &:hover,
  &:focus {
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

export const H3 = styled.h3`
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 2.3rem;
  margin: 0;
`;

export const H4 = styled.h4`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin: 0;
`;

export const H5 = styled.h5`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.2rem;
  margin: 0;
`;

export const H6 = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-transform: uppercase;
  color: #898f9e;
  margin: 0;
`;

export const UnstyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
