import React from 'react';
import { Link as ReachLink } from '@reach/router';
import styled from 'styled-components';
import iconLogo from 'assets/logo-icon.svg';
import downArrowIcon from 'assets/icons/down-arrow-white.svg';
import { useAuth } from 'components/Auth';
import { Text } from 'components/Typography';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled(ReachLink)`
  position: relative;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${palette.white};
  text-decoration: none;

  &[data-active='true'] {
    font-weight: 700;

    &:after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      display: block;
      width: 1.6rem;
      height: 1px;
      background: ${palette.white};
    }
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

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
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
  const { isAuthenticated, showLoginModal } = useAuth();

  function handleShowHelp() {
    console.log('Help and FAQs!');
  }

  // TODO: should use Auth user address
  const tempAddress = 'hxc28387c8801185231882022fe90d0b6cc8d6ac7c';

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
      {isAuthenticated ? (
        <AddressContainer>
          <img src={iconLogo} alt="ICON logo" style={{ width: '2.2rem' }} />
          <Text heavy style={{ color: palette.white, margin: '0 0.9rem 0 0.7rem' }}>
            {tempAddress.substr(0, 8)}…{tempAddress.substr(-4)}
          </Text>
          <img src={downArrowIcon} alt="Down arrow" style={{ width: '0.9rem' }} />
        </AddressContainer>
      ) : (
        <Button type="button" onClick={showLoginModal}>
          Sign in
        </Button>
      )}
    </Container>
  );
}

export default Navigation;
