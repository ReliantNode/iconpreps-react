import React from 'react';
import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import '@reach/listbox/styles.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import downArrowIcon from 'assets/icons/down-arrow-black.svg';
import { H1, H3 } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.div`
  display: block;

  @media screen and (min-width: ${breakpoints.min.lg}) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${palette.background};
  border-bottom: 1px solid ${palette.gray.border};
  padding: 2rem;
`;

const Title = styled(H1)`
  flex: 1;
  font-size: 2rem;
  line-height: 2.7rem;
`;

const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.2rem;
  height: 4rem;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.8rem;
  color: ${palette.white};
  background: ${palette.brand.primary};
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
`;

const Order = styled.div`
  border-bottom: 1px solid ${palette.gray.border};
  padding: 2rem 0 3rem;
  margin: 0 2rem;
`;

const DropdownInput = styled(ListboxInput)`
  margin-top: 2rem;
`;

const DropdownButton = styled(ListboxButton)`
  width: 100%;
  height: 4rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.4rem;
`;

const DropdownPopover = styled(ListboxPopover)`
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.3rem;
  padding: 0.5rem 0;
`;

const DropdownOption = styled(ListboxOption)`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.8rem;
  padding: 0.7rem 1.5rem;

  &[data-current] {
    font-weight: inherit;
    color: ${palette.black};
    background: ${palette.gray.border};
  }
  &[aria-selected='true'] {
    font-weight: 700;
    color: ${palette.black};
    background: none;
    &[data-current] {
      background: ${palette.gray.border};
    }
  }
`;

function DownArrow() {
  return <img src={downArrowIcon} alt="Down arrow" style={{ width: '0.9rem' }} />;
}

function FiltersHeader({ order, orderings = [], onChangeOrdering, onCloseFilters, ...props }) {
  return (
    <Container {...props}>
      <Header>
        <Title>Filters</Title>
        <ApplyButton type="button" onClick={onCloseFilters}>
          Apply
        </ApplyButton>
      </Header>
      <Order>
        <H3>Sort by</H3>
        <DropdownInput value={order} onChange={onChangeOrdering} aria-labelledby="order-label">
          <DropdownButton arrow={<DownArrow />} />
          <DropdownPopover>
            <ListboxList>
              {orderings.map(({ value, label }) => (
                <DropdownOption value={value} key={value}>
                  {label}
                </DropdownOption>
              ))}
            </ListboxList>
          </DropdownPopover>
        </DropdownInput>
      </Order>
    </Container>
  );
}

FiltersHeader.propTypes = {
  onChangeOrdering: PropTypes.func.isRequired,
  onCloseFilters: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FiltersHeader;
