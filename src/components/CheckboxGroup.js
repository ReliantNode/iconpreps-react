import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Checkbox from 'components/Checkbox';

const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
`;

function CheckboxGroup({ name, onChange, options, values, ...props }) {
  function handleCheckboxChange(event) {
    const { checked, value } = event.target;
    const newValues = checked ? [...values, value] : values.filter(v => v !== value);
    onChange(newValues);
  }

  return (
    <Fieldset {...props}>
      {options.map(({ children, value }) => (
        <Checkbox
          value={value}
          onChange={handleCheckboxChange}
          checked={values.includes(value)}
          name={name}
          key={value}
          children={children}
          style={{ marginTop: '1rem' }}
        />
      ))}
    </Fieldset>
  );
}

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckboxGroup;
