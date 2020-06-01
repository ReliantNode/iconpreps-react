import React, { useEffect, useState } from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import styled, { css, keyframes } from 'styled-components';
import iconLogo from 'assets/logo-icon-white.svg';
import closeIcon from 'assets/icons/close.svg';
import { useAuth } from 'components/Auth';
import { H1, H2, Text } from 'components/Typography';
import { getAuthToken } from 'utils/authApi';
import { ICONEX_RELAY } from 'utils/constants';
import { palette } from 'utils/designTokens';
import { wait } from 'utils/wait';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  background: 'rgba(16, 15, 16, 0.6)';
  backdrop-filter: blur(6px);
  padding: 0 2rem;
  z-index: 40;
`;

const StyledDialogContent = styled(DialogContent)`
  width: 56rem;
  max-width: 100%;
  background: ${palette.background};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
  padding: 0;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  background: ${palette.white};
  border-bottom: 1px solid ${palette.gray.border};
  padding: 2rem 3rem;
`;

const Title = styled(H1)`
  font-size: 2.2rem !important;
  line-height: 3rem !important;
`;

const CloseButton = styled.button`
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
    outline: none; /* naughty! */
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 5rem;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: ${palette.white};
  background: ${({ disabled, working }) =>
    working ? palette.brand.dark : disabled ? palette.gray.dark : palette.brand.primary};
  border: none;
  border-radius: 0.4rem;
  padding: 0;
  margin-top: 3rem;
  cursor: pointer;
`;

const IconLogo = styled.img`
  width: 2.5rem;
  margin-right: 1rem;
  animation: ${({ spin }) =>
    spin
      ? css`
          ${rotate} 2s linear infinite
        `
      : 'none'};
`;

function LoginModal({ isOpen, onClose, ...props }) {
  const { login } = useAuth();
  const [hasIcon, setHasIcon] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    setIsChecking(true);
    window.addEventListener(ICONEX_RELAY.RESPONSE, iconCheckHandler, { once: true });

    function iconCheckHandler(event) {
      const { type, payload } = event.detail;
      switch (type) {
        case 'RESPONSE_HAS_ACCOUNT':
          setHasIcon(true);
          setHasAccount(payload.hasAccount);
          setIsChecking(false);
          return;
        default:
          console.warn(`No handler setup for event ${type}`);
      }
    }

    // need to delay sending REQUEST_HAS_ACCOUNT?
    wait(3000).then(() => {
      setTimeout(() => setIsChecking(false), 2000);
      window.dispatchEvent(
        new CustomEvent(ICONEX_RELAY.REQUEST, {
          detail: { type: 'REQUEST_HAS_ACCOUNT' },
        })
      );
    });
  }, []); // eslint-disable-line

  const AnimatedDialogOverlay = animated(StyledDialogOverlay);
  const AnimatedDialogContent = animated(StyledDialogContent);
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  function handleLogin() {
    let userAddress;
    const tokenPromise = getAuthToken();

    window.addEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler, { once: true });
    window.dispatchEvent(
      new CustomEvent(ICONEX_RELAY.REQUEST, {
        detail: { type: 'REQUEST_ADDRESS' },
      })
    );

    async function handleResponseAddress(address) {
      setIsWorking(true);
      userAddress = address;
      await wait();

      try {
        const token = await tokenPromise;
        window.addEventListener(ICONEX_RELAY.RESPONSE, relayEventHandler, { once: true });
        window.dispatchEvent(
          new CustomEvent(ICONEX_RELAY.REQUEST, {
            detail: {
              type: 'REQUEST_SIGNING',
              payload: { from: address, hash: token },
            },
          })
        );
      } catch (error) {
        setIsWorking(false);
      }
    }

    async function handleResponseSigning(signature) {
      await login(userAddress, signature);
      onClose();

      await wait(1000);
      setIsWorking(false);
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
          return setIsWorking(false);
        default:
          console.warn(`No handler setup for event ${type}`);
      }
    }
  }

  return transitions.map(
    ({ item, key, props: styles }) =>
      item && (
        <AnimatedDialogOverlay onDismiss={onClose} key={key} style={{ opacity: styles.opacity }}>
          <AnimatedDialogContent
            style={{
              transform: styles.y.interpolate(value => `translate3d(0px, ${value}px, 0px)`),
            }}
            aria-label="Login with ICON"
            {...props}
          >
            <Header>
              <Title>Log in with ICON</Title>
              <CloseButton type="button" onClick={onClose}>
                <img src={closeIcon} alt="Close" style={{ width: '1.7rem' }} />
              </CloseButton>
            </Header>
            <Main>
              <H2>Log in to leave your feedback</H2>
              <Text style={{ marginTop: '2rem' }}>
                To leave feedback on a project, you’ll first need to sign into your ICON account.
                We’ll then associate your feedback to a wallet address. By default, your name will
                remain anonymous.
              </Text>
              <LoginButton
                type="button"
                onClick={handleLogin}
                disabled={isWorking || isChecking || !hasIcon || !hasAccount}
                working={isWorking}
              >
                <IconLogo src={iconLogo} alt="ICON logo" spin={isWorking} />
                <span>Log{isWorking ? 'ging' : ''} in with ICON</span>
                <Text heavy style={{ fontSize: '1.6rem', color: palette.white }}></Text>
              </LoginButton>
              <Text
                small
                muted
                error={!isChecking && (!hasIcon || !hasAccount)}
                style={{ marginTop: '2rem' }}
              >
                {isChecking ? (
                  <>Checking for ICONex extension...</>
                ) : !hasIcon ? (
                  <>
                    You need to be using an ICON-supported browser
                    <br />
                    (eg. <b>Chrome</b> with <b>ICONex extension</b>)
                  </>
                ) : !hasAccount ? (
                  <>You need to add an ICON account to your ICON-supported browser</>
                ) : (
                  <>You must have staked ICX to leave feedback.</>
                )}
              </Text>
            </Main>
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      )
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
