import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import closeIcon from 'assets/icons/close.svg';
import { H1 } from 'components/Typography';
import { palette } from 'utils/designTokens';

const Title = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

const Img = styled.img`
  width: 1.4rem;
  height: 1.4rem;
`;

function SearchHeader({ title, tags = [] }) {
  return (
    <>
      <Title>
        <H1>{title}</H1>
      </Title>
      <Tags>
        {tags.map(({ label, rm }, index) => (
          <Tag key={label} style={{ marginLeft: index !== 0 ? '1rem' : 0 }}>
            <TagLabel>{label}</TagLabel>
            <TagButton onClick={rm}>
              <Img src={closeIcon} alt="Remove item" />
            </TagButton>
          </Tag>
        ))}
      </Tags>
    </>
  );
}

SearchHeader.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      rm: PropTypes.func.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
};

export default SearchHeader;
