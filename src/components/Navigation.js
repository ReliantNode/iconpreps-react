import React, { useState } from 'react';
import '@reach/dialog/styles.css';
import { Menu, MenuPopover } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { positionMatchWidth } from '@reach/popover';
import { animated, useTransition } from 'react-spring';
import iconLogo from 'assets/logo-icon-white.svg';
import closeIcon from 'assets/icons/close.svg';
import downArrowIcon from 'assets/icons/down-arrow-white.svg';
import hamburgerIcon from 'assets/icons/hamburger.svg';
import { useAuth } from 'components/Auth';
import FAQModal from 'components/FAQModal';
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
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const [isShowingFAQ, setIsShowingFAQ] = useState(false);

  const AnimatedDialogOverlay = animated(S.DialogOverlay);
  const AnimatedDialogContent = animated(S.DialogContent);
  const transitions = useTransition(isShowingMenu, null, {
    from: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 50 },
  });

  function onClose() {
    setIsShowingMenu(false);
  }

  function handleShowFAQ() {
    onClose();
    setIsShowingFAQ(true);
  }

  function handleLogin() {
    onClose();
    showLoginModal();
  }

  return (
    <>
      <S.HamburgerContainer>
        <S.HamburgerButton type="button" onClick={() => setIsShowingMenu(true)}>
          <img src={hamburgerIcon} alt="Hamburger menu icon" style={{ width: '2.4rem' }} />
        </S.HamburgerButton>

        {transitions.map(
          ({ item, key, props: styles }) =>
            item && (
              <AnimatedDialogOverlay
                onDismiss={onClose}
                key={key}
                style={{ opacity: styles.opacity }}
              >
                <AnimatedDialogContent
                  style={{
                    transform: styles.y.interpolate(value => `translate3d(0px, ${value}px, 0px)`),
                  }}
                  aria-label="Menu"
                >
                  <S.MenuHeader>
                    <S.MenuTitle>Menu</S.MenuTitle>
                    <S.MenuCloseButton type="button" onClick={onClose}>
                      <img src={closeIcon} alt="Close" style={{ width: '1.7rem' }} />
                    </S.MenuCloseButton>
                  </S.MenuHeader>
                  <S.MenuBody>
                    <S.NavMenuLink to="/projects" onClick={onClose}>
                      Projects
                    </S.NavMenuLink>
                    <S.NavMenuLink to="/preps" onClick={onClose}>
                      P-Reps
                    </S.NavMenuLink>
                    <S.NavMenuButton type="button" onClick={handleShowFAQ}>
                      Help & FAQs
                    </S.NavMenuButton>
                    <S.NavMenuButton type="button" onClick={handleLogin} branded>
                      Sign in
                    </S.NavMenuButton>
                  </S.MenuBody>
                </AnimatedDialogContent>
              </AnimatedDialogOverlay>
            )
        )}
      </S.HamburgerContainer>

      <S.NavContainer>
        <NavLink to="/projects">Projects</NavLink>
        <S.Separator />
        <NavLink to="/preps">P-Reps</NavLink>
        <S.Separator />
        <S.ButtonLink type="button" onClick={handleShowFAQ}>
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

      <FAQModal isOpen={isShowingFAQ} onClose={() => setIsShowingFAQ(false)} />
    </>
  );
}

export default Navigation;
