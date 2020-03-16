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
import closeIcon from 'assets/icons/close.svg';
import downArrowIcon from 'assets/icons/down-arrow.svg';
import { H1, Text } from 'components/Typography';
import { palette } from 'utils/designTokens';

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Ordering = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownInput = styled(ListboxInput)`
  margin-left: 1rem;
`;

const DropdownButton = styled(ListboxButton)`
  width: 16.5rem;
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

const Tags = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 4rem;
  margin-top: 2rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: stretch;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.4rem;
  overflow: hidden;
`;

const TagLabel = styled.div`
  padding: 0.9rem 1.5rem;
`;

const TagButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  padding: 0;
  background: none;
  border: none;
  border-left: 1px solid ${palette.gray.border};
  cursor: pointer;
`;

function DownArrow() {
  return <img src={downArrowIcon} alt="Down arrow" style={{ width: '0.9rem' }} />;
}

function SearchHeader({ title, tags = [], order, orderings = [], onChangeOrdering }) {
  return (
    <>
      <Title>
        <H1>{title}</H1>
        <Ordering>
          <Text small id="order-label">
            Sort by:
          </Text>
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
        </Ordering>
      </Title>
      <Tags>
        {tags.map(({ label, rm }, index) => (
          <Tag key={label} style={{ marginLeft: index !== 0 ? '1rem' : 0 }}>
            <TagLabel>{label}</TagLabel>
            <TagButton onClick={rm}>
              <img
                src={closeIcon}
                alt="Remove item"
                style={{ width: '1.4rem', height: '1.4rem' }}
              />
            </TagButton>
          </Tag>
        ))}
      </Tags>
    </>
  );
}

SearchHeader.propTypes = {
  onChangeOrdering: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderings: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      rm: PropTypes.func.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
};

export default SearchHeader;
