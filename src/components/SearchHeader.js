import React from 'react';
import PropTypes from 'prop-types';
import { H1 } from 'components/Typography';

function SearchHeader({ title, tags = [] }) {
  return <H1>{title}</H1>;
}

SearchHeader.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SearchHeader;
