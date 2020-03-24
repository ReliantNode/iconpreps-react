import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import searchIcon from 'assets/icons/search.svg';
import CheckboxGroup from 'components/CheckboxGroup';
import { useProjects } from 'components/Projects';
import RadioGroup from 'components/RadioGroup';
import Stars from 'components/Stars';
import { H3, Text } from 'components/Typography';
import { breakpoints, palette } from 'utils/designTokens';

const Container = styled.div`
  padding: 2rem;

  @media screen and (min-width: ${breakpoints.min.lg}) {
    padding: 3rem 2rem;
  }
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

  &:focus {
    outline: none;
    border-color: ${palette.brand.primary};
  }

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

const defaultProjectFilters = {
  categories: [],
  ratings: [],
  recentActivity: [],
  statuses: [],
};

function ProjectSearch({
  filters,
  onChange,
  filtersToUse = useAllFilters,
  showFilterCounts = true,
}) {
  const { getFilters, hasFilters } = useProjects();
  const [projectFilters, setProjectFilters] = useState(defaultProjectFilters);
  const [query, setQuery] = useState(filters.query);
  const [debouncedQuery] = useDebounce(query, 400);
  const [ignoredFirstQuery, setIgnoredFirstQuery] = useState(false);

  useEffect(() => {
    if (hasFilters) {
      setProjectFilters(getFilters());
    }
  }, [hasFilters]); // eslint-disable-line

  useEffect(() => {
    // Ignore the first debounced query change (on component mount), it messes up the query params
    if (!ignoredFirstQuery) return setIgnoredFirstQuery(true);

    onChange({ query: debouncedQuery, limit: 20 });
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
    onChange({ categories, limit: 20 });
  }

  function handleRatingChange(ratingValue) {
    onChange({ rating: ratingValue, limit: 20 });
  }

  function handleRecentChange(recentTypeValue) {
    onChange({ recent: recentTypeValue, limit: 20 });
  }

  function handleStatusChange(status) {
    onChange({ status, limit: 20 });
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
            options={projectFilters.categories.map(category => ({
              value: category.name,
              children: (
                <>
                  <OptionLabel>{category.name}</OptionLabel>
                  {showFilterCounts && (
                    <Text small muted>
                      {category.count}
                    </Text>
                  )}
                </>
              ),
            }))}
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
            options={projectFilters.ratings.map(rating => ({
              value: parseInt(rating.name),
              children: (
                <>
                  <StarsLabel amount={parseInt(rating.name)}>& up</StarsLabel>
                  {showFilterCounts && (
                    <Text small muted>
                      {rating.count}
                    </Text>
                  )}
                </>
              ),
            }))}
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
            options={projectFilters.recentActivity.map(recentActivity => ({
              value: recentActivity.name.split(' ')[0],
              children: (
                <>
                  <OptionLabel>{recentActivity.name}</OptionLabel>
                  {showFilterCounts && (
                    <Text small muted>
                      {recentActivity.count}
                    </Text>
                  )}
                </>
              ),
            }))}
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
            options={projectFilters.statuses.map(status => ({
              value: status.name,
              children: (
                <>
                  <OptionLabel>{status.name}</OptionLabel>
                  {showFilterCounts && (
                    <Text small muted>
                      {status.count}
                    </Text>
                  )}
                </>
              ),
            }))}
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
  onChange: PropTypes.func.isRequired,
  filtersToUse: PropTypes.shape({
    query: PropTypes.bool,
    category: PropTypes.bool,
    rating: PropTypes.bool,
    recent: PropTypes.bool,
    status: PropTypes.bool,
  }),
  showFilterCounts: PropTypes.bool,
};

export default ProjectSearch;
