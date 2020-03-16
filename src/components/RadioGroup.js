import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function RadioGroup({ name, onChange, options, value: groupValue, ...props }) {
  function handleRadioChange(event) {
    onChange(event.target.value);
  }

  return (
    <Fieldset {...props}>
      {options.map(({ children, value }) => (
        <Label key={value} style={{ marginTop: '1rem' }}>
          <input
            type="radio"
            value={value}
            onChange={handleRadioChange}
            checked={value === groupValue}
            name={name}
          />
          {children}
        </Label>
      ))}
    </Fieldset>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
};

export default RadioGroup;
