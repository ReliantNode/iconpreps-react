import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import goldStarIcon from 'assets/icons/star-gold.svg';
import grayStarIcon from 'assets/icons/star-gray.svg';
import { Text } from 'components/Typography';

const TOTAL_STARS = 5;
const STAR_WIDTH = 2.1;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StarContainer = styled.div`
  position: relative;
  width: ${STAR_WIDTH}rem;
  height: ${STAR_WIDTH}rem;
  margin-right: 0.4rem;
`;

const Star = styled.img`
  width: ${STAR_WIDTH}rem;
`;

const PartialStarCrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;

  ${Star} {
    max-width: none;
  }
`;

function Rating({ overall, total, terse = false, ...props }) {
  const stars = Math.floor(overall);
  const lastStarFraction = overall % 1;
  return (
    <Container {...props}>
      {new Array(TOTAL_STARS).fill().map((_, index) => {
        const isGoldStar = index < stars;
        const isPartialStar = index === stars && lastStarFraction;
        return (
          <StarContainer key={index}>
            <Star
              src={isGoldStar ? goldStarIcon : grayStarIcon}
              alt={isGoldStar ? 'Gold star' : 'Gray star'}
            />
            {isPartialStar ? (
              <PartialStarCrop style={{ width: `${STAR_WIDTH * lastStarFraction}rem` }}>
                <Star src={goldStarIcon} alt="Partial gold star" />
              </PartialStarCrop>
            ) : null}
          </StarContainer>
        );
      })}
      {total != null && (
        <Text small muted style={{ marginLeft: '0.6rem' }}>
          {terse ? `(${total})` : `${total} rating${total !== 1 ? 's' : ''}`}
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
