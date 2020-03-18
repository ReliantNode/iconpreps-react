import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import goldStarIcon from 'assets/icons/star-gold.svg';
import grayStarIcon from 'assets/icons/star-gray.svg';

const TOTAL_STARS = 5;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StarContainer = styled.button`
  position: relative;
  width: 2.5rem;
  height: 2.1rem;
  background: none;
  border: none;
  padding: 0 0.4rem 0 0;
  cursor: pointer;

  &:last-child {
    padding: 0;
  }
`;

const Star = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 2.1rem;
  transition: 0.2s opacity;

  &[data-is-preview='true'] {
    opacity: 0.7;
  }
`;

function SetRating({ onChange, value, ...props }) {
  const [previewStars, setPreviewStars] = useState(0);
  const [resetTimer, setResetTimer] = useState(null);

  function resetPreviewStars() {
    setResetTimer(setTimeout(() => setPreviewStars(0), 300));
  }

  function handleSetPreviewStars(previewStars) {
    return () => {
      clearTimeout(resetTimer);
      setResetTimer(null);
      setPreviewStars(previewStars);
    };
  }

  return (
    <Container {...props} onMouseOut={resetPreviewStars}>
      {new Array(TOTAL_STARS).fill().map((_, index) => {
        const isPreview = previewStars !== 0;
        const rating = isPreview ? previewStars : value;
        return (
          <StarContainer
            data-stars={index + 1}
            key={index}
            onClick={() => onChange(index + 1)}
            onMouseOver={handleSetPreviewStars(index + 1)}
          >
            <Star src={grayStarIcon} alt="Gray star" />
            {index < rating && (
              <Star src={goldStarIcon} alt="Gold star" data-is-preview={isPreview} />
            )}
          </StarContainer>
        );
      })}
    </Container>
  );
}

SetRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SetRating;
