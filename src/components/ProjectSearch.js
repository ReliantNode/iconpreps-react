import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import searchIcon from 'assets/icons/search.svg';
import CheckboxGroup from 'components/CheckboxGroup';
import RadioGroup from 'components/RadioGroup';
import Stars from 'components/Stars';
import { H3, Text } from 'components/Typography';
import { FILTER_ACTIONS } from 'utils/filters';
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

const OptionLabel = styled(Text)`
  flex: 1;
  margin-left: 1rem;
`;

const StarsLabel = styled(Stars)`
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

const useAllFilters = {
  query: true,
  category: true,
  rating: true,
  recent: true,
  status: true,
};

function ProjectSearch({ filters, dispatch, filtersToUse = useAllFilters }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    dispatch({ type: FILTER_ACTIONS.SET_QUERY, payload: debouncedQuery });
  }, [debouncedQuery]); // eslint-disable-line

  useEffect(() => {
    if (filters.query !== query) {
      // Handle query being updated externally
      setQuery(filters.query);
    }
  }, [filters]); // eslint-disable-line

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  function handleCategoriesChange(categories) {
    dispatch({ type: FILTER_ACTIONS.SET_CATEGORIES, payload: categories });
  }

  function handleRatingChange(ratingValue) {
    dispatch({ type: FILTER_ACTIONS.SET_RATING, payload: ratingValue });
  }

  function handleRecentChange(recentTypeValue) {
    dispatch({ type: FILTER_ACTIONS.SET_RECENT, payload: recentTypeValue });
  }

  function handleStatusChange(status) {
    dispatch({ type: FILTER_ACTIONS.SET_STATUS, payload: status });
  }

  return (
    <Container>
      {filtersToUse.query && (
        <>
          <H3>Search</H3>
          <SearchInput
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search P-Rep projects"
          />
          <Separator />
        </>
      )}

      {filtersToUse.category && (
        <>
          <H3>Category</H3>
          <CheckboxGroup
            options={[
              {
                value: 'Development',
                children: (
                  <>
                    <OptionLabel>Development</OptionLabel>
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
                    <OptionLabel>Education</OptionLabel>
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
                    <OptionLabel>Marketing</OptionLabel>
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
                    <OptionLabel>Community</OptionLabel>
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
                    <OptionLabel>Infrastructure</OptionLabel>
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
                    <OptionLabel>Other</OptionLabel>
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
        </>
      )}

      {filtersToUse.rating && (
        <>
          <H3>Rating</H3>
          <RadioGroup
            options={[
              {
                value: '4',
                children: (
                  <>
                    <StarsLabel amount={4}>& up</StarsLabel>
                    <Text small muted>
                      8
                    </Text>
                  </>
                ),
              },
              {
                value: '3',
                children: (
                  <>
                    <StarsLabel amount={3}>& up</StarsLabel>
                    <Text small muted>
                      45
                    </Text>
                  </>
                ),
              },
              {
                value: '2',
                children: (
                  <>
                    <StarsLabel amount={2}>& up</StarsLabel>
                    <Text small muted>
                      59
                    </Text>
                  </>
                ),
              },
            ]}
            value={filters.rating}
            onChange={handleRatingChange}
            name="rating"
            style={{ marginTop: '1rem' }}
          />
          <Separator />
        </>
      )}

      {filtersToUse.recent && (
        <>
          <H3>Recent activity</H3>
          <RadioGroup
            options={[
              {
                value: 'Updated',
                children: (
                  <>
                    <OptionLabel>Updated in last 7 days</OptionLabel>
                    <Text small muted>
                      32
                    </Text>
                  </>
                ),
              },
              {
                value: 'Created',
                children: (
                  <>
                    <OptionLabel>Created in last 7 days</OptionLabel>
                    <Text small muted>
                      8
                    </Text>
                  </>
                ),
              },
            ]}
            value={filters.recent}
            onChange={handleRecentChange}
            name="recent"
            style={{ marginTop: '1rem' }}
          />
          <Separator />
        </>
      )}

      {filtersToUse.status && (
        <>
          <H3>Status</H3>
          <RadioGroup
            options={[
              {
                value: 'Planning',
                children: (
                  <>
                    <OptionLabel>Planning</OptionLabel>
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
                    <OptionLabel>Executing</OptionLabel>
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
                    <OptionLabel>Complete</OptionLabel>
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
        </>
      )}
    </Container>
  );
}

ProjectSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  filtersToUse: PropTypes.shape({
    query: PropTypes.bool,
    category: PropTypes.bool,
    rating: PropTypes.bool,
    recent: PropTypes.bool,
    status: PropTypes.bool,
  }),
};

export default ProjectSearch;
