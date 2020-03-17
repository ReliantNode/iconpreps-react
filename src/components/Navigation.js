import React from 'react';
import { Link as ReachLink } from '@reach/router';
import styled from 'styled-components';
import iconLogo from 'assets/logo-icon.svg';
import downArrowIcon from 'assets/icons/down-arrow-white.svg';
import { useAuth } from 'components/Auth';
import { Text } from 'components/Typography';
import { getAuthToken, login } from 'utils/authApi';
import { ICONEX_RELAY } from 'utils/constants';
import { palette } from 'utils/designTokens';
import { wait } from 'utils/wait';

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
  const { authUser, isAuthenticated } = useAuth();

  function handleSignIn() {
    let userAddress;
    const tokenPromise = getAuthToken();

    window.addEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler);

    window.dispatchEvent(
      new CustomEvent(ICONEX_RELAY.REQUEST, {
        detail: { type: 'REQUEST_ADDRESS' },
      })
    );

    async function handleResponseAddress(address) {
      userAddress = address;
      await wait();

      try {
        const token = await tokenPromise;
        window.dispatchEvent(
          new CustomEvent(ICONEX_RELAY.REQUEST, {
            detail: {
              type: 'REQUEST_SIGNING',
              payload: { from: address, hash: token },
            },
          })
        );
      } catch (error) {
        window.removeEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler);
      }
    }

    async function handleResponseSigning(signature) {
      const auth = await login(userAddress, signature);
      console.log('AUTH?', auth);

      window.removeEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler);
    }

    function handleCancelSigning() {
      window.removeEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler);
    }

    function relayEventHandler(event) {
      const { type, payload } = event.detail;
      switch (type) {
        case 'RESPONSE_ADDRESS':
          return handleResponseAddress(payload);
        case 'RESPONSE_SIGNING':
          return handleResponseSigning(payload);
        case 'CANCEL':
        case 'CANCEL_SIGNING':
          return handleCancelSigning(payload);
        default:
          console.warn(`No handler setup for event ${type}`);
      }
    }
  }

  function handleShowHelp() {
    console.log('Help and FAQs!');
  }

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
        <Button type="button" onClick={handleSignIn}>
          Sign in
        </Button>
      )}
    </Container>
  );
}

export default Navigation;
