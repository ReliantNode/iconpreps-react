import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

function getColorByStatus(status) {
  switch (status) {
    case 'Planning':
    case 'Complete':
      return palette.white;
    case 'Executing':
    default:
      return palette.black;
  }
}

function getBgByStatus(status) {
  switch (status) {
    case 'Planning':
      return palette.pink;
    case 'Complete':
      return palette.green;
    case 'Executing':
    default:
      return palette.yellow;
  }
}

const Container = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.5rem;
  color: ${({ status }) => getColorByStatus(status)};
  background: ${({ status }) => getBgByStatus(status)};
  padding: 0.5rem 2.3rem;
  border-radius: 1.5rem;
`;

function ProjectStatus({ status, ...props }) {
  return (
    <Container status={status} {...props}>
      {status}
    </Container>
  );
}

ProjectStatus.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ProjectStatus;
