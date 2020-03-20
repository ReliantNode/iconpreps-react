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
  width: 100%;
  max-width: ${breakpoints.min.xl};
  padding: 0 2rem;
  margin: 0 auto;
`;

const Inner = styled.div`
  border-top: 1px solid ${palette.gray.border};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.min.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 13rem;
    padding: 3rem 0;
  }
`;

const FooterFirst = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0;

  @media screen and (min-width: ${breakpoints.min.md}) {
    justify-content: flex-start;
    padding: 0;
  }
`;

const FooterSecond = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${palette.gray.border};
  padding: 3rem 0;

  @media screen and (min-width: ${breakpoints.min.md}) {
    align-items: flex-end;
    border: none;
    padding: 0;
  }
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

const ArrowIcon = styled.img`
  width: 1.4rem;
  margin-left: 0.8rem;
`;

const Slogan = styled(Text)`
  @media screen and (min-width: ${breakpoints.min.md}) {
    order: 2;
    margin-top: 1.5rem;
  }
`;

const PRepLinks = styled.div`
  display: flex;
  margin-top: 2rem;

  @media screen and (min-width: ${breakpoints.min.md}) {
    order: 1;
    margin: 0;
  }
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
      <Inner>
        <FooterFirst>
          <Logo src={logoReliantNode} alt="ReliantNode logo" />
          <PRepDetails>
            <Text>A ReliantNode P-Rep project.</Text>
            <Text style={{ marginTop: '1rem' }}>
              <A href="https://www.reliantnode.com/" target="_blank" rel="noopener noreferrer">
                Learn more
                <ArrowIcon src={rightArrowIcon} alt="Right arrow" />
              </A>
            </Text>
          </PRepDetails>
        </FooterFirst>
        <FooterSecond>
          <Slogan>
            <i>Helping to build the future of ICON.</i>
          </Slogan>
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
            <PRepLink
              href="https://github.com/ReliantNode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon src={githubIcon} alt="GitHub icon" />
            </PRepLink>
          </PRepLinks>
        </FooterSecond>
      </Inner>
    </Container>
  );
}

export default Header;
