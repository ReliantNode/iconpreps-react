import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import goldStarIcon from 'assets/icons/star-gold.svg';
import grayStarIcon from 'assets/icons/star-gray.svg';
import { Text } from 'components/Typography';

const TOTAL_STARS = 5;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Star = styled.img`
  width: 2.1rem;
  height: 2.1rem;
  margin-right: 0.4rem;
`;

function Rating({ overall, total, terse = false, ...props }) {
  const stars = Math.round(overall);
  return (
    <Container {...props}>
      {new Array(TOTAL_STARS).fill().map((_, index) => {
        const isGoldStar = index < stars;
        return (
          <Star
            src={isGoldStar ? goldStarIcon : grayStarIcon}
            alt={isGoldStar ? 'Gold star' : 'Gray star'}
            key={index}
          />
        );
      })}
      {total && (
        <Text small muted style={{ marginLeft: '0.6rem' }}>
          {terse ? `(${total})` : `${total} ratings`}
        </Text>
      )}
    </Container>
  );
}

Rating.propTypes = {
  overall: PropTypes.number.isRequired,
  total: PropTypes.number,
  terse: PropTypes.bool,
};

export default Rating;
