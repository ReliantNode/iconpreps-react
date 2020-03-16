import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import searchIcon from 'assets/icons/search.svg';
import CheckboxGroup from 'components/CheckboxGroup';
import RadioGroup from 'components/RadioGroup';
import { H3, Text } from 'components/Typography';
import { FILTER_ACTIONS } from 'utils/constants';
import { palette } from 'utils/designTokens';

const Container = styled.div`
  flex-shrink: 0;
  width: 26rem;
  padding: 3rem 2rem;
  background: ${palette.white};
  border: 1px solid ${palette.gray.border};
  border-radius: 0.6rem;
  box-shadow: 0 2px 5px 0 rgba(206, 210, 219, 0.5);
`;

const SearchInput = styled.input`
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  font-weight: 500;
  border: 1px solid ${palette.gray.border};
  border-radius: 0.4rem;
  padding: 0 1rem 0 4rem;
  margin-top: 2rem;
  background: no-repeat 1rem/2rem url(${searchIcon});

  &::placeholder {
    opacity: 0.25;
  }
`;

const CheckboxLabel = styled(Text)`
  flex: 1;
  margin-left: 1rem;
`;

const Separator = styled.hr`
  width: 100%;
  height: 1px;
  background: ${palette.gray.border};
  border: none;
  margin: 3rem 0;
`;

function ProjectSearch({ filters, dispatch }) {
  function handleCategoriesChange(categories) {
    dispatch({ type: FILTER_ACTIONS.SET_CATEGORIES, payload: categories });
  }

  function handleStatusChange(status) {
    dispatch({ type: FILTER_ACTIONS.SET_STATUS, payload: status });
  }

  return (
    <Container>
      <H3>Search</H3>
      <SearchInput type="text" placeholder="Search P-Rep projects" />
      <Separator />

      <H3>Category</H3>
      <CheckboxGroup
        options={[
          {
            value: 'Development',
            children: (
              <>
                <CheckboxLabel>Development</CheckboxLabel>
                <Text small muted>
                  30
                </Text>
              </>
            ),
          },
          {
            value: 'Education',
            children: (
              <>
                <CheckboxLabel>Education</CheckboxLabel>
                <Text small muted>
                  12
                </Text>
              </>
            ),
          },
          {
            value: 'Marketing',
            children: (
              <>
                <CheckboxLabel>Marketing</CheckboxLabel>
                <Text small muted>
                  11
                </Text>
              </>
            ),
          },
          {
            value: 'Community',
            children: (
              <>
                <CheckboxLabel>Community</CheckboxLabel>
                <Text small muted>
                  11
                </Text>
              </>
            ),
          },
          {
            value: 'Infrastructure',
            children: (
              <>
                <CheckboxLabel>Infrastructure</CheckboxLabel>
                <Text small muted>
                  2
                </Text>
              </>
            ),
          },
          {
            value: 'Other',
            children: (
              <>
                <CheckboxLabel>Other</CheckboxLabel>
                <Text small muted>
                  5
                </Text>
              </>
            ),
          },
        ]}
        values={filters.categories}
        onChange={handleCategoriesChange}
        name="categories"
        style={{ marginTop: '1rem' }}
      />
      <Separator />

      <H3>Rating</H3>
      <Separator />

      <H3>Recent activity</H3>
      <Separator />

      <H3>Status</H3>
      <RadioGroup
        options={[
          {
            value: 'Planning',
            children: (
              <>
                <CheckboxLabel>Planning</CheckboxLabel>
                <Text small muted>
                  20
                </Text>
              </>
            ),
          },
          {
            value: 'Executing',
            children: (
              <>
                <CheckboxLabel>Executing</CheckboxLabel>
                <Text small muted>
                  39
                </Text>
              </>
            ),
          },
          {
            value: 'Complete',
            children: (
              <>
                <CheckboxLabel>Complete</CheckboxLabel>
                <Text small muted>
                  7
                </Text>
              </>
            ),
          },
        ]}
        value={filters.status}
        onChange={handleStatusChange}
        name="status"
        style={{ marginTop: '1rem' }}
      />
    </Container>
  );
}

ProjectSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ProjectSearch;
