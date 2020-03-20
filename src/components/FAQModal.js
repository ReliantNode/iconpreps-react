import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import userLevelsImage from 'assets/user-levels.png';
import closeIcon from 'assets/icons/close.svg';
import { A, H1, H2 as RawH2, Text } from 'components/Typography';
import { breakpoints } from 'utils/designTokens';

const StyledDialogOverlay = styled(DialogOverlay)`
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  z-index: 40;
`;

const StyledDialogContent = styled(DialogContent)`
  width: 100%;
  max-width: ${breakpoints.min.xl};
  background: none;
  border: none;
  overflow-y: scroll;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    padding: 2rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    padding: 4rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 4.5rem;
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

  @media screen and (max-width: ${breakpoints.max.sm}) {
    right: 2.5rem;
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    right: 4.5rem;
  }
`;

const Columns = styled.div`
  @media screen and (max-width: ${breakpoints.max.sm}) {
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 1;

  @media screen and (max-width: ${breakpoints.max.sm}) {
    &:last-child {
      margin-top: 4rem;
    }
  }

  @media screen and (min-width: ${breakpoints.min.md}) {
    &:last-child {
      margin-left: 4rem;
    }
  }
`;

const H2 = styled(RawH2)`
  margin-top: 4rem;
`;

function LoginModal({ isOpen, onClose, ...props }) {
  const AnimatedDialogOverlay = animated(StyledDialogOverlay);
  const AnimatedDialogContent = animated(StyledDialogContent);
  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  return transitions.map(
    ({ item, key, props: styles }) =>
      item && (
        <AnimatedDialogOverlay onDismiss={onClose} key={key} style={{ opacity: styles.opacity }}>
          <CloseButton type="button" onClick={onClose}>
            <img src={closeIcon} alt="Close" style={{ width: '1.7rem' }} />
          </CloseButton>
          <AnimatedDialogContent
            style={{
              transform: styles.y.interpolate(value => `translate3d(0px, ${value}px, 0px)`),
            }}
            aria-label="Frequently Asked Questions"
            {...props}
          >
            <H1>Frequently Asked Questions</H1>
            <Columns>
              <Column>
                <H2>1. Why does this site exist?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  We aim to surface the projects that ICON P-Reps are working on in an
                  easy-to-consume and interactive format.
                </Text>
                <Text style={{ marginTop: '2rem' }}>
                  A P-Rep is a team that you can vote for, which is working on various projects that
                  will benefit and grow the ICON eco-system.{' '}
                </Text>

                <H2>2. As a P-Rep, where do I upload my projects?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  You will continue to create and update your projects over on{' '}
                  <A
                    href="https://icon.community/iconsensus/prep_all_projects/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ICON.COMMUNITY
                  </A>
                  . We’ve written an API to achieve this, which means there’s no duplication of
                  work.
                </Text>

                <H2>3. Why are my votes important?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  When you stake your ICX to earn rewards, you’ll vote for a P-Rep (or multiple
                  P-Reps). They also earn rewards, which helps to fund their work. In short, a vote
                  for a P-Rep, is a vote of support for the projects they are working on.
                </Text>
                <Text style={{ marginTop: '2rem' }}>
                  It’s important to note that you, as the voter, earn the same amount of rewards no
                  matter what P-Rep you vote for.
                </Text>

                <H2>4. How do I leave a rating and feedback on a project?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  Firstly, you’ll need to sign in using your ICON wallet. You can then leave a
                  rating and feedback, if you have at least 10 ICX staked to ICON.
                </Text>
              </Column>
              <Column>
                <H2>5. Will my rating and feedback be anonymous?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  When you leave your rating and feedback, you’ll notice an image and name next to
                  your wallet address. This represents how much ICX you have staked — e.g. “whale”.
                  Your name is not revealed.
                </Text>
                <img
                  src={userLevelsImage}
                  alt="User levels explainer"
                  style={{ marginTop: '1rem' }}
                />

                <H2>6. Who runs this site?</H2>
                <Text style={{ marginTop: '1.6rem' }}>
                  The ReliantNode P-Rep team. If you’d like to contact us, please{' '}
                  <A
                    href="https://twitter.com/ReliantNode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    tweet us
                  </A>
                  . We’d love to hear from you. Want more information? You can learn more at:{' '}
                  <A
                    href="https://medium.com/@ReliantNode/icon-p-rep-projects-30bd1e573b45"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    medium.com/@ReliantNode/icon-p-rep-projects-30bd1e573b45
                  </A>
                </Text>
              </Column>
            </Columns>
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
