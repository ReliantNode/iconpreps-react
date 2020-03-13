import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tagIcon from 'assets/icons/tag.svg';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background: ${palette.brand.background};
  border-radius: 0.6rem;
`;

const Text = styled.p`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${palette.brand.primary};
  margin: 0 0 0 0.6rem;
`;

const Icon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  background-size: cover;
  margin-top: 0.1rem;
`;

function Category({ category, ...props }) {
  return (
    <Container {...props}>
      <Icon src={tagIcon} alt="Tag icon" />
      <Text>{category}</Text>
    </Container>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Category;
