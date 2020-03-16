import React, { useEffect, useReducer, useState } from 'react';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { shuffle, take, orderBy } from 'lodash-es';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import Completion from 'components/Completion';
import Layout from 'components/Layout';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import ProjectSearch from 'components/ProjectSearch';
import { useProjects } from 'components/Projects';
import Rating from 'components/Rating';
import SearchHeader from 'components/SearchHeader';
import { H2, Text } from 'components/Typography';
import { FILTER_ACTIONS } from 'utils/constants';
import { palette } from 'utils/designTokens';
import * as S from './ProjectList.styles';

const ORDERINGS = {
  RANDOM: { value: 'Random', label: 'Random', fn: projects => shuffle(projects) },
  CREATED: {
    value: 'Newest',
    label: 'Newest Project',
    fn: projects => orderBy(projects, ['created_date'], ['desc']),
  },
};

const RECENT_ACTIVITY_TYPES = {
  UPDATED: { value: 'Updated', label: 'Updated in last 7 days', property: 'updated_date' },
  CREATED: { value: 'Created', label: 'Created in last 7 days', property: 'created_date' },
};

const DATE_FORMAT = 'MMM d, yyyy';

const INITIAL_FILTERS = {
  limit: 20,
  order: ORDERINGS.RANDOM,
  query: '',
  categories: [],
  rating: null,
  recent: null,
  status: null,
};

function filterReducer(state, action) {
  const { type, payload = null } = action;
  switch (type) {
    case FILTER_ACTIONS.SET_ORDER:
      return { ...state, order: payload };
    case FILTER_ACTIONS.SET_QUERY:
      return { ...state, query: payload };
    case FILTER_ACTIONS.SET_CATEGORIES:
      return { ...state, categories: payload };
    case FILTER_ACTIONS.REMOVE_CATEGORY:
      const categories = state.categories.filter(category => category !== payload);
      return { ...state, categories };
    case FILTER_ACTIONS.SET_RATING:
      return { ...state, rating: payload };
    case FILTER_ACTIONS.SET_RECENT:
      return { ...state, recent: payload };
    case FILTER_ACTIONS.SET_STATUS:
      return { ...state, status: payload };
    default:
      throw new Error(`Unknown action ${type}`);
  }
}

function isRecentProject(project, recentActivityType) {
  return isAfter(parseISO(project[recentActivityType.property]), subDays(new Date(), 7));
}

const mockProjectRatings = {
  overall: 4,
  total: 12,
};

function ProjectListPage() {
  const { hasPReps } = usePReps();
  const { getProjects, hasProjects, isLoading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filters, filtersDispatch] = useReducer(filterReducer, INITIAL_FILTERS);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (hasPReps && hasProjects) setProjects(getProjects());
  }, [hasPReps, hasProjects]); // eslint-disable-line

  useEffect(() => {
    const filtered = projects.filter(project => {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (
          !(
            project.name.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query)
          )
        ) {
          return false;
        }
      }

      if (filters.categories.length && !filters.categories.includes(project.category)) return false;

      if (filters.status && filters.status !== project.status) return false;

      if (filters.recent) {
        const recentActivityType = Object.values(RECENT_ACTIVITY_TYPES).find(
          ({ value }) => value === filters.recent
        );
        if (recentActivityType && !isRecentProject(project, recentActivityType)) return false;
      }

      return true;
    });

    const ordered = filters.order.fn(filtered);

    setFilteredProjects(take(ordered, filters.limit));
  }, [filters, projects]);

  useEffect(() => {
    const tags = [];
    if (filters.query) {
      tags.push({
        label: filters.query,
        rm: () => filtersDispatch({ type: FILTER_ACTIONS.SET_QUERY, payload: '' }),
      });
    }
    if (filters.categories) {
      tags.push(
        ...filters.categories.map(category => ({
          label: category,
          rm: () => filtersDispatch({ type: FILTER_ACTIONS.REMOVE_CATEGORY, payload: category }),
        }))
      );
    }
    if (filters.recent) {
      tags.push({
        label: `${filters.recent} recently`,
        rm: () => filtersDispatch({ type: FILTER_ACTIONS.SET_RECENT }),
      });
    }
    if (filters.status) {
      tags.push({
        label: filters.status,
        rm: () => filtersDispatch({ type: FILTER_ACTIONS.SET_STATUS }),
      });
    }
    setTags(tags);
  }, [filters]);

  function handleChangeOrdering(orderValue) {
    const order = Object.values(ORDERINGS).find(({ value }) => value === orderValue);
    filtersDispatch({ type: FILTER_ACTIONS.SET_ORDER, payload: order });
  }

  return (
    <Layout>
      <S.Container>
        <ProjectSearch filters={filters} dispatch={filtersDispatch} />

        <S.Listing>
          <SearchHeader
            title="ICON P-Rep projects"
            tags={tags}
            order={filters.order.value}
            orderings={Object.values(ORDERINGS)}
            onChangeOrdering={handleChangeOrdering}
          />

          {hasProjects && (
            <CardList style={{ marginTop: '2rem' }}>
              {filteredProjects.map(project => (
                <Card key={project.id} style={{ alignItems: 'flex-start' }}>
                  <LogoWrapper>
                    {project.pRep && project.pRep.logo && (
                      <Logo src={project.pRep.logo} alt={`${project.pRep.name} logo`} />
                    )}
                  </LogoWrapper>
                  <S.ProjectDetails>
                    <S.ProjectHeader>
                      <div>
                        <H2>{project.name}</H2>
                        <Rating {...mockProjectRatings} style={{ marginTop: '1rem' }} />
                      </div>
                      <Category category={project.category} />
                    </S.ProjectHeader>
                    <Text style={{ marginTop: '1.5rem' }}>{project.description}</Text>
                    <S.ProjectMeta>
                      <S.ProjectStatus>{project.status}</S.ProjectStatus>
                      <S.ProjectMetaSeparator />
                      <Completion completed={project.progress} />
                      <S.ProjectMetaSeparator />
                      <Text small style={{ flex: 1 }}>
                        {format(new Date(project.start_date), DATE_FORMAT)}&nbsp;-&nbsp;
                        {format(new Date(project.end_date), DATE_FORMAT)}
                      </Text>
                      {isRecentProject(project, RECENT_ACTIVITY_TYPES.CREATED) ? (
                        <>
                          <S.ProjectMetaSeparator />
                          <S.ProjectRecent>
                            <S.Dot style={{ background: palette.beige }} />
                            <Text small>Recently created</Text>
                          </S.ProjectRecent>
                        </>
                      ) : isRecentProject(project, RECENT_ACTIVITY_TYPES.UPDATED) ? (
                        <>
                          <S.ProjectMetaSeparator />
                          <S.ProjectRecent>
                            <S.Dot style={{ background: palette.brand.primary }} />
                            <Text small>Recently updated</Text>
                          </S.ProjectRecent>
                        </>
                      ) : null}
                    </S.ProjectMeta>
                  </S.ProjectDetails>
                </Card>
              ))}
            </CardList>
          )}
          {!hasProjects && isLoading && <div style={{ marginTop: '2rem' }}>Loading...</div>}
        </S.Listing>
      </S.Container>
    </Layout>
  );
}

export default ProjectListPage;
