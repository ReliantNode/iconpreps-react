import { orderBy, shuffle } from 'lodash-es';
import { parse, stringify } from 'query-string';

export const RECENT_ACTIVITY_TYPES = {
  UPDATED: { value: 'Updated', label: 'Updated in last 7 days', property: 'updated_date' },
  CREATED: { value: 'Created', label: 'Created in last 7 days', property: 'created_date' },
};

export const PROJECT_ORDERINGS = {
  RANDOM: { value: 'Random', label: 'Random', fn: projects => shuffle(projects) },
  RATINGS: {
    value: 'Ratings',
    label: 'Highest Rating',
    fn: projects => orderBy(projects, ['total_ratings', 'rating_count'], ['desc', 'desc']),
  },
  REVIEWS: {
    value: 'Reviews',
    label: 'Most reviews',
    fn: projects => orderBy(projects, ['rating_count', 'total_ratings'], ['desc', 'desc']),
  },
  CREATED: {
    value: 'Newest',
    label: 'Newest Project',
    fn: projects => orderBy(projects, ['created_date'], ['desc']),
  },
};

export const PROJECT_FILTERS = {
  limit: 20,
  order: PROJECT_ORDERINGS.RATINGS,
  query: '',
  categories: [],
  rating: null,
  recent: null,
  status: null,
};

export const PREP_ORDERINGS = {
  RANDOM: { value: 'Random', label: 'Random', fn: projects => shuffle(projects) },
  RANK: {
    value: 'Rank',
    label: 'Rank',
    fn: projects => orderBy(projects, ['rank'], ['asc']),
  },
};

export const PREP_FILTERS = {
  limit: 20,
  order: PREP_ORDERINGS.RANDOM,
  query: '',
  categories: [],
};

function buildFilterQueryFactory(defaultFilters) {
  return filters => {
    const queryParams = [
      'query',
      'categories',
      'rating',
      'recent',
      'status',
      'order',
      'limit',
    ].reduce((queryParams, property) => {
      if (
        defaultFilters.hasOwnProperty(property) &&
        filters[property] !== defaultFilters[property]
      ) {
        queryParams[property] = filters[property].value || filters[property];
      }
      return queryParams;
    }, {});

    return stringify(queryParams, { arrayFormat: 'comma', sort: false });
  };
}

export const buildProjectFilterQuery = buildFilterQueryFactory(PROJECT_FILTERS);
export const buildPRepFilterQuery = buildFilterQueryFactory(PREP_FILTERS);

function mergeFiltersWithQueryFactory(orderings) {
  return (filters, queryString) => {
    const queryParams = parse(queryString, { arrayFormat: 'comma', parseNumbers: true });

    if (queryParams.categories && typeof queryParams.categories === 'string') {
      queryParams.categories = [queryParams.categories];
    }

    if (queryParams.order) {
      const order = Object.values(orderings).find(({ value }) => value === queryParams.order);
      if (order) queryParams.order = order;
      else delete queryParams.order;
    }

    return { ...filters, ...queryParams };
  };
}

export const mergeProjectFiltersWithQuery = mergeFiltersWithQueryFactory(PROJECT_ORDERINGS);
export const mergePRepFiltersWithQuery = mergeFiltersWithQueryFactory(PREP_ORDERINGS);
