import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'utils/designTokens';

// TODO: use @reach/radio

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

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.dark};
  border-radius: 100%;
  overflow: hidden;
`;

const Radio = styled.div`
  width: 100%;
  height: 100%;
  background: ${palette.gray.dark};
  border: 0.4rem solid ${palette.white};
  border-radius: 100%;
  transition: transform 0.2s;
  transform: ${({ checked }) => (checked ? 'scale(1)' : 'scale(0)')};
`;

function RadioGroup({ name, onChange, options, value: groupValue, ...props }) {
  function handleRadioChange(event) {
    onChange(event.target.value);
  }

  return (
    <Fieldset {...props}>
      {options.map(({ children, value }) => {
        const checked = value === groupValue;
        return (
          <Label key={value} style={{ marginTop: '1rem' }}>
            <RadioContainer>
              <input
                type="radio"
                value={value}
                onChange={handleRadioChange}
                checked={value === groupValue}
                name={name}
                style={{ display: 'none' }}
              />
              <Radio checked={checked} />
            </RadioContainer>
            {children}
          </Label>
        );
      })}
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
