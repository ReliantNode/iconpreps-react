import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

const Container = styled.div``;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.5rem;
  color: ${palette.black};
  margin: 0;
`;

const Bar = styled.div`
  width: 12.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
  background: ${palette.gray.bar};
  margin-top: 0.8rem;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  background: ${palette.brand.primary};
`;

function Completion({ completed, ...props }) {
  const percentage = parseInt(completed);
  return (
    <Container {...props}>
      <Text>{percentage}% completed</Text>
      <Bar>
        <BarFill style={{ width: `${percentage}%` }} />
      </Bar>
    </Container>
  );
}

Completion.propTypes = {
  completed: PropTypes.string.isRequired,
};

export default Completion;
