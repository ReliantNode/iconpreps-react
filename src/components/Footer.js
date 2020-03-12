import React from 'react';
import styled from 'styled-components';
import logoReliantNode from 'assets/logo-reliant-node.png';
import rightArrowIcon from 'assets/icons/right-arrow.svg';
import { A, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  width: 100%;
  max-width: ${breakpoints.desktop}px;
  margin: 0 auto;
  padding: 30px 0;
  border-top: 1px solid ${palette.gray.border};
`;

const FooterSide = styled.div`
  display: flex;
`;

const Logo = styled.img`
  width: 75px;
  height: 75px;
`;

const PRepDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

function Header() {
  return (
    <Container>
      <FooterSide>
        <Logo src={logoReliantNode} alt="ReliantNode logo" />
        <PRepDetails>
          <Text>A ReliantNode P-Rep project.</Text>
          <Text style={{ marginTop: '1rem' }}>
            <A href="https://www.reliantnode.com/" target="_blank" rel="noopener noreferrer">
              Learn more <img src={rightArrowIcon} alt="Right arrow" height="10" />
            </A>
          </Text>
        </PRepDetails>
      </FooterSide>
      <FooterSide>Helping to build the future of ICON.</FooterSide>
    </Container>
  );
}

export default Header;
