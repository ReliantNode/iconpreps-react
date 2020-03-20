import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import goldStarIcon from 'assets/icons/star-gold.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Star = styled.img`
  width: 2.1rem;
  margin-right: 0.4rem;
`;

function Stars({ amount, children, className }) {
  return (
    <Container className={className}>
      {new Array(amount).fill().map((_, index) => (
        <Star src={goldStarIcon} alt={'Gold star'} key={index} />
      ))}
      <div style={{ marginLeft: '0.5rem', marginTop: '0.2rem' }}>{children}</div>
    </Container>
  );
}

Stars.propTypes = {
  amount: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Stars;
