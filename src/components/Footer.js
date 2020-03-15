import React from 'react';
import styled from 'styled-components';
import logoReliantNode from 'assets/logo-reliant-node.png';
import githubIcon from 'assets/icons/github.svg';
import rightArrowIcon from 'assets/icons/right-arrow.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import webIcon from 'assets/icons/web.svg';
import { A, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 13rem;
  width: 100%;
  max-width: ${breakpoints.desktop}px;
  margin: 0 auto;
  padding: 3rem 0;
  border-top: 1px solid ${palette.gray.border};
`;

const FooterLeft = styled.div`
  display: flex;
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Logo = styled.img`
  width: 7.5rem;
  height: 7.5rem;
`;

const PRepDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const PRepLinks = styled.div`
  display: flex;
`;

const PRepLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${palette.green2};
  border-radius: 0.4rem;
  overflow: hidden;
  margin-left: 1rem;
`;

const LinkIcon = styled.img`
  width: 2rem;
`;

function Header() {
  return (
    <Container>
      <FooterLeft>
        <Logo src={logoReliantNode} alt="ReliantNode logo" />
        <PRepDetails>
          <Text>A ReliantNode P-Rep project.</Text>
          <Text style={{ marginTop: '1rem' }}>
            <A href="https://www.reliantnode.com/" target="_blank" rel="noopener noreferrer">
              Learn more <img src={rightArrowIcon} alt="Right arrow" style={{ height: '1rem' }} />
            </A>
          </Text>
        </PRepDetails>
      </FooterLeft>
      <FooterRight>
        <PRepLinks>
          <PRepLink
            href="https://twitter.com/ReliantNode"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon src={twitterIcon} alt="Twitter icon" />
          </PRepLink>
          <PRepLink href="https://www.reliantnode.com/" target="_blank" rel="noopener noreferrer">
            <LinkIcon src={webIcon} alt="Website icon" />
          </PRepLink>
          <PRepLink href="https://github.com/ReliantNode" target="_blank" rel="noopener noreferrer">
            <LinkIcon src={githubIcon} alt="GitHub icon" />
          </PRepLink>
        </PRepLinks>
        <Text style={{ marginTop: '1.5rem' }}>
          <i>Helping to build the future of ICON.</i>
        </Text>
      </FooterRight>
    </Container>
  );
}

export default Header;
