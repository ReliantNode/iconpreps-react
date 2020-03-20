import React from 'react';
import styled, { keyframes } from 'styled-components';
import iconLogo from 'assets/logo-icon-brand.svg';
import { H3 } from 'components/Typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const IconLogo = styled.img`
  width: 5rem;
  margin-right: 1.5rem;
  animation: ${rotate} 2s linear infinite;
`;

function Loading(props) {
  return (
    <Container {...props}>
      <IconLogo src={iconLogo} alt="ICON logo" />
      <H3>Loading…</H3>
    </Container>
  );
}

export default Loading;
