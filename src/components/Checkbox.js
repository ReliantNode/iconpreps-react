import React from 'react';
import { CustomCheckboxContainer, CustomCheckboxInput } from '@reach/checkbox';
import '@reach/checkbox/styles.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import checkIcon from 'assets/icons/check.svg';
import { palette } from 'utils/designTokens';

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxContainer = styled(CustomCheckboxContainer)`
  width: 2.2rem;
  height: 2.2rem;
  background: ${palette.white};
  outline: none !important;
`;

const CheckBorder = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ focused }) => (focused ? palette.brand.primary : palette.gray.dark)};
  border-radius: 0.3rem;
  outline: none !important;
  overflow: hidden;
`;

const Check = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: no-repeat 0.4rem /1.2rem url(${checkIcon}) rgba(16, 15, 16, 0.8);
  transition: transform 0.2s;
  transform: ${({ checked }) => (checked ? 'scale(1)' : 'scale(0)')};
  outline: none !important;
`;

function Checkbox({ checked, children, onChange, style = {}, ...props }) {
  return (
    <Label style={style}>
      <CheckboxContainer checked={checked} onChange={onChange}>
        {({ focused }) => (
          <CheckBorder focused={focused} aria-hidden>
            <CustomCheckboxInput checked={checked} {...props} />
            <Check checked={checked} aria-hidden />
          </CheckBorder>
        )}
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
