import styled, { css } from 'styled-components';
import {
  DialogContent as ReachDialogContent,
  DialogOverlay as ReachDialogOverlay,
} from '@reach/dialog';
import { MenuButton, MenuItem, MenuItems } from '@reach/menu-button';
import { Link as ReachLink } from '@reach/router';
import { H1 } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

export const HamburgerContainer = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: none;
  }
`;

export const NavContainer = styled.nav`
  display: none;
  align-items: center;

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
  }
`;

export const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const DialogOverlay = styled(ReachDialogOverlay)`
  background: 'rgba(16, 15, 16, 0.6)';
  backdrop-filter: blur(6px);
`;

export const DialogContent = styled(ReachDialogContent)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: auto;
  background: ${palette.background};
  border: 1px solid ${palette.gray.border};
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 0;
  margin: 0;
  overflow: hidden;
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  border-bottom: 1px solid ${palette.gray.border};
  padding: 2rem;
`;

export const MenuTitle = styled(H1)`
  font-size: 2rem;
  line-height: 2.7rem;
`;

export const MenuCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none; /* bad! */
  }
`;

export const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

const navMenuItems = css`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.2rem;
  text-align: left;
  text-decoration: none;
  color: ${palette.black};
  background: none;
  border: none;
  border-bottom: 1px solid ${palette.gray.border};
  padding: 2rem 0;
  margin: 0;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;
export const NavMenuButton = styled.button`
  ${navMenuItems}
`;
export const NavMenuLink = styled(ReachLink)`
  ${navMenuItems}
`;

export const Link = styled(ReachLink)`
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

export const ButtonLink = styled.button`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${palette.white};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const LoginButton = styled.button`
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

export const DropdownButton = styled(MenuButton)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none; /* TODO: bad! */
`;

export const DropdownList = styled(MenuItems)`
  position: absolute;
  right: 0;
  width: 14rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.3rem;
  padding: 0.5rem 0;
`;

export const DropdownItem = styled(MenuItem)`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  padding: 0.7rem 1.5rem;

  &[data-selected] {
    color: ${palette.black};
    background: ${palette.gray.border};
  }
`;

export const Separator = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 2rem;
  background: ${palette.white};
`;
