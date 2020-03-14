import React from 'react';
import { Link as ReachLink } from '@reach/router';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled(ReachLink)`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${palette.white};
  text-decoration: none;

  &[data-active='true'] {
    font-weight: 700;
  }
`;

const ButtonLink = styled.button`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${palette.white};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Button = styled.button`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${palette.brand.primary};
  background: ${palette.white};
  border: none;
  border-radius: 0.4rem;
  padding: 1rem;
  cursor: pointer;
`;

const Separator = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 2rem;
  background: ${palette.white};
`;

function NavLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isPartiallyCurrent }) => ({
        'data-active': isPartiallyCurrent,
      })}
    />
  );
}

function Navigation() {
  function handleSignIn() {
    console.log('Sign in!');
  }

  function handleShowHelp() {
    console.log('Help and FAQs!');
  }

  return (
    <Container>
      <NavLink to="/projects">Projects</NavLink>
      <Separator />
      <NavLink to="/preps">P-Reps</NavLink>
      <Separator />
      <ButtonLink type="button" onClick={handleShowHelp}>
        Help & FAQs
      </ButtonLink>
      <Separator />
      <Button type="button" onClick={handleSignIn}>
        Sign in
      </Button>
    </Container>
  );
}

export default Navigation;
