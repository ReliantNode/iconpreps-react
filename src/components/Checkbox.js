import React from 'react';
import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import checkIcon from 'assets/icons/check.svg';
import { palette } from 'utils/designTokens';
import '@reach/checkbox/styles.css';

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContainer = styled(CustomCheckboxContainer)`
  width: 2.2rem;
  height: 2.2rem;
  background: ${palette.white};
  border: 1px solid #878787;
  border-radius: 0.3rem;
  overflow: hidden;
`;

const Check = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: no-repeat 0.4rem /1.2rem url(${checkIcon}) #403f40;
  transition: transform 0.2s;
  transform: ${({ checked }) => (checked ? 'scale(1)' : 'scale(0)')};
`;

function Checkbox({ checked, children, onChange, style = {}, ...props }) {
  return (
    <Label style={style}>
      <CheckboxContainer checked={checked} onChange={onChange}>
        <CustomCheckboxInput checked={checked} {...props} />
        <Check checked={checked} aria-hidden />
      </CheckboxContainer>
      {children}
    </Label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Checkbox;
