import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import banner from 'assets/banner.svg';
import { Text } from 'components/Typography';
import { palette } from 'utils/designTokens';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${banner});
  background-size: cover;
  width: 49px;
  height: 72px;

  ${Text} {
    font-weight: 600;
    color: ${palette.white};
    margin-top: -1.2rem;
    margin-left: 0.7rem;
  }
`;

function RankBanner({ rank, ...props }) {
  return (
    <Container {...props}>
      <Text>{rank}</Text>
    </Container>
  );
}

RankBanner.propTypes = {
  rank: PropTypes.number.isRequired,
};

export default RankBanner;
