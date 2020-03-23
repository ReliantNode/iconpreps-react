import { orderBy, shuffle } from 'lodash-es';
import { parse, stringify } from 'query-string';

export const FILTER_ACTIONS = {
  SET_LIMIT: 'set_limit',
  SET_ORDER: 'set_order',
  SET_QUERY: 'set_query',
  SET_CATEGORIES: 'set_categories',
  REMOVE_CATEGORY: 'remove_category',
  SET_RATING: 'set_rating',
  SET_RECENT: 'set_recent',
  SET_STATUS: 'set_status',
};

export const PROJECT_ORDERINGS = {
  RANDOM: { value: 'Random', label: 'Random', fn: projects => shuffle(projects) },
  RATINGS: {
    value: 'Ratings',
    label: 'Highest Rating',
    fn: projects => orderBy(projects, ['rating', 'rating_count'], ['desc', 'desc']),
  },
  REVIEWS: {
    value: 'Reviews',
    label: 'Most reviews',
    fn: projects => orderBy(projects, ['rating_count', 'rating'], ['desc', 'desc']),
  },
  CREATED: {
    value: 'Newest',
    label: 'Newest Project',
    fn: projects => orderBy(projects, ['created_date'], ['desc']),
  },
};

export const PROJECT_FILTERS = {
  limit: 20,
  order: PROJECT_ORDERINGS.RANDOM,
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

export function projectFilterReducer(state, action) {
  const { type, payload = null } = action;
  switch (type) {
    case FILTER_ACTIONS.SET_LIMIT:
      return { ...state, limit: payload };
    case FILTER_ACTIONS.SET_ORDER:
      return { ...state, order: payload, limit: 20 };
    case FILTER_ACTIONS.SET_QUERY:
      return { ...state, query: payload, limit: 20 };
    case FILTER_ACTIONS.SET_CATEGORIES:
      return { ...state, categories: payload, limit: 20 };
    case FILTER_ACTIONS.REMOVE_CATEGORY:
      const categories = state.categories.filter(category => category !== payload);
      return { ...state, categories, limit: 20 };
    case FILTER_ACTIONS.SET_RATING:
      return { ...state, rating: payload, limit: 20 };
    case FILTER_ACTIONS.SET_RECENT:
      return { ...state, recent: payload, limit: 20 };
    case FILTER_ACTIONS.SET_STATUS:
      return { ...state, status: payload, limit: 20 };
    default:
      throw new Error(`Unknown action ${type}`);
  }
}

export function buildPRepFilterQuery(filters) {
  const order =
    typeof filters.order === 'string'
      ? Object.values(PREP_ORDERINGS).find(({ value }) => value === filters.order)
      : filters.order;

  const queryParams = {
    query: filters.query !== PREP_FILTERS.query ? filters.query : undefined,
    categories: filters.categories !== PREP_FILTERS.categories ? filters.categories : undefined,
    order: order !== PREP_FILTERS.order ? order.value : undefined,
    limit: filters.limit !== PREP_FILTERS.limit ? filters.limit : undefined,
  };

  return stringify(queryParams, { arrayFormat: 'comma' });
}

export function mergePRepFiltersWithQuery(filters, queryString) {
  const queryParams = parse(queryString, { arrayFormat: 'comma' });

  if (queryParams.categories && typeof queryParams.categories === 'string') {
    queryParams.categories = [queryParams.categories];
  }

  if (queryParams.order) {
    const order = Object.values(PREP_ORDERINGS).find(({ value }) => value === queryParams.order);
    if (order) queryParams.order = order;
    else delete queryParams.order;
  }

  return { ...filters, ...queryParams };
}
