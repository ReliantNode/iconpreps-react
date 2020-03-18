import React from 'react';
import { Menu, MenuPopover } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { positionMatchWidth } from '@reach/popover';
import iconLogo from 'assets/logo-icon.svg';
import downArrowIcon from 'assets/icons/down-arrow-white.svg';
import hamburgerIcon from 'assets/icons/hamburger.svg';
import { useAuth } from 'components/Auth';
import { Text } from 'components/Typography';
import { palette } from 'utils/designTokens';
import { formatAddress } from 'utils/formatAddress';
import * as S from './Navigation.styles';

function NavLink(props) {
  return (
    <S.Link
      {...props}
      getProps={({ isPartiallyCurrent }) => ({
        'data-active': isPartiallyCurrent,
      })}
    />
  );
}

function Navigation() {
  const { authUser, isAuthenticated, logout, showLoginModal } = useAuth();

  function handleShowMenu() {
    console.log('Mobile menu!');
  }

  function handleShowHelp() {
    console.log('Help and FAQs!');
  }

  return (
    <>
      <S.HamburgerContainer>
        <S.HamburgerButton type="button" onClick={handleShowMenu}>
          <img src={hamburgerIcon} alt="Hamburger menu icon" style={{ width: '2.4rem' }} />
        </S.HamburgerButton>
      </S.HamburgerContainer>

      <S.NavContainer>
        <NavLink to="/projects">Projects</NavLink>
        <S.Separator />
        <NavLink to="/preps">P-Reps</NavLink>
        <S.Separator />
        <S.ButtonLink type="button" onClick={handleShowHelp}>
          Help & FAQs
        </S.ButtonLink>
        <S.Separator />
        {isAuthenticated ? (
          <Menu>
            <S.DropdownButton>
              <img src={iconLogo} alt="ICON logo" style={{ width: '2.2rem' }} />
              <Text heavy style={{ color: palette.white, margin: '0 0.9rem 0 0.7rem' }}>
                {formatAddress(authUser.username)}
              </Text>
              <img src={downArrowIcon} alt="Down arrow" style={{ width: '0.9rem' }} />
            </S.DropdownButton>
            <MenuPopover position={positionMatchWidth}>
              <S.DropdownList>
                <S.DropdownItem onSelect={logout}>Sign out</S.DropdownItem>
              </S.DropdownList>
            </MenuPopover>
          </Menu>
        ) : (
          <S.LoginButton type="button" onClick={showLoginModal}>
            Sign in
          </S.LoginButton>
        )}
      </S.NavContainer>
    </>
  );
}

export default Navigation;
