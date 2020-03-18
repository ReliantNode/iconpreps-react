import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, MenuPopover } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { positionMatchWidth } from '@reach/popover';
import { Link as ReachLink } from '@reach/router';
import styled from 'styled-components';
import iconLogo from 'assets/logo-icon.svg';
import downArrowIcon from 'assets/icons/down-arrow-white.svg';
import { useAuth } from 'components/Auth';
import { Text } from 'components/Typography';
import { palette } from 'utils/designTokens';
import { formatAddress } from 'utils/formatAddress';

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

const DropdownButton = styled(MenuButton)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none; /* TODO: bad! */
`;

const DropdownList = styled(MenuItems)`
  position: absolute;
  right: 0;
  width: 14rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.3rem;
  padding: 0.5rem 0;
`;

const DropdownItem = styled(MenuItem)`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  padding: 0.7rem 1.5rem;

  &[data-selected] {
    color: ${palette.black};
    background: ${palette.gray.border};
  }
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
  const { authUser, isAuthenticated, logout, showLoginModal } = useAuth();

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
      {isAuthenticated ? (
        <Menu>
          <DropdownButton>
            <img src={iconLogo} alt="ICON logo" style={{ width: '2.2rem' }} />
            <Text heavy style={{ color: palette.white, margin: '0 0.9rem 0 0.7rem' }}>
              {formatAddress(authUser.username)}
            </Text>
            <img src={downArrowIcon} alt="Down arrow" style={{ width: '0.9rem' }} />
          </DropdownButton>
          <MenuPopover position={positionMatchWidth}>
            <DropdownList>
              <DropdownItem onSelect={logout}>Sign out</DropdownItem>
            </DropdownList>
          </MenuPopover>
        </Menu>
      ) : (
        <Button type="button" onClick={showLoginModal}>
          Sign in
        </Button>
      )}
    </Container>
  );
}

export default Navigation;
