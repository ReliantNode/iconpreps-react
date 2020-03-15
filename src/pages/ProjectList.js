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
import { palette } from 'utils/designTokens';
import * as S from './ProjectList.styles';

const ORDERINGS = {
  RANDOM: { label: 'Random', fn: projects => shuffle(projects) },
  CREATED: {
    label: 'Newest Project',
    fn: projects => orderBy(projects, ['created_date'], ['desc']),
  },
};

const RECENT_ACTIVITY_TYPES = {
  UPDATED: { label: 'Updated in last 7 days', property: 'updated_date' },
  CREATED: { label: 'Created in last 7 days', property: 'created_date' },
};

const DATE_FORMAT = 'MMM d, yyyy';

const FILTER_ACTIONS = {
  SET_QUERY: 'set_query',
  ADD_CATEGORY: 'add_category',
  REMOVE_CATEGORY: 'REMOVE_category',
  SET_STATUS: 'set_status',
};
const INITIAL_FILTERS = {
  limit: 20,
  order: ORDERINGS.RANDOM,
  query: '',
  categories: [],
  status: null,
  recent: null,
};

function filterReducer(state, action) {
  switch (action.type) {
    case FILTER_ACTIONS.SET_QUERY:
      return { ...state, query: action.payload };
    case FILTER_ACTIONS.ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case FILTER_ACTIONS.REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category !== action.payload),
      };
    case FILTER_ACTIONS.SET_STATUS:
      return { ...state, status: action.payload };
    default:
      throw new Error(`Unknown action ${action.type}`);
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

  useEffect(() => {
    if (hasPReps && hasProjects) setProjects(getProjects());
  }, [hasPReps, hasProjects]); // eslint-disable-line

  useEffect(() => {
    const filtered = projects.filter(project => {
      if (filters.categories.length && !filters.categories.includes(project.category)) return false;
      if (filters.status && filters.status !== project.status) return false;
      if (filters.recent && !isRecentProject(project, filters.recent)) return false;
      return true;
    });

    const ordered = filters.order.fn(filtered);

    setFilteredProjects(take(ordered, filters.limit));
  }, [filters, projects]);

  return (
    <Layout>
      <S.Container>
        <ProjectSearch />
        <div style={{ marginLeft: '3rem' }}>
          <SearchHeader title="ICON P-Rep projects" />

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
        </div>
      </S.Container>
    </Layout>
  );
}

export default ProjectListPage;
