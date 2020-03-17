import React, { useEffect, useReducer, useState } from 'react';
import { format, isAfter, parseISO, subDays } from 'date-fns';
import { take } from 'lodash-es';
import PropTypes from 'prop-types';
import { Card, CardList } from 'components/Cards';
import Category from 'components/Category';
import Completion from 'components/Completion';
import { Logo, LogoWrapper } from 'components/Logo';
import { usePReps } from 'components/PReps';
import ProjectSearch from 'components/ProjectSearch';
import { useProjects } from 'components/Projects';
import Rating from 'components/Rating';
import SearchHeader from 'components/SearchHeader';
import { H2, Text, UnstyledLink } from 'components/Typography';
import { DATE_FORMAT } from 'utils/constants';
import { palette } from 'utils/designTokens';
import {
  FILTER_ACTIONS,
  PROJECT_FILTERS,
  PROJECT_ORDERINGS,
  projectFilterReducer,
} from 'utils/filters';
import * as S from './ProjectList.styles';

const RECENT_ACTIVITY_TYPES = {
  UPDATED: { value: 'Updated', label: 'Updated in last 7 days', property: 'updated_date' },
  CREATED: { value: 'Created', label: 'Created in last 7 days', property: 'created_date' },
};

function isRecentProject(project, recentActivityType) {
  return isAfter(parseISO(project[recentActivityType.property]), subDays(new Date(), 7));
}

function ProjectList({ title, filtersToUse, additionalFilter }) {
  const { hasPReps } = usePReps();
  const { getProjects, getRatings, hasProjects, isLoading } = useProjects();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filters, filtersDispatch] = useReducer(projectFilterReducer, PROJECT_FILTERS);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (hasPReps && hasProjects) {
      setProjects(getProjects());
      setRatings(getRatings());
    }
  }, [hasPReps, hasProjects]); // eslint-disable-line

  useEffect(() => {
    let filtered = additionalFilter ? projects.filter(additionalFilter) : projects;
    filtered = filtered.filter(project => {
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
  }, [filters, projects]); // eslint-disable-line

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
    const order = Object.values(PROJECT_ORDERINGS).find(({ value }) => value === orderValue);
    filtersDispatch({ type: FILTER_ACTIONS.SET_ORDER, payload: order });
  }

  return (
    <S.Container>
      <ProjectSearch filters={filters} dispatch={filtersDispatch} filtersToUse={filtersToUse} />

      <S.Listing>
        <SearchHeader
          title={title}
          tags={tags}
          order={filters.order.value}
          orderings={Object.values(PROJECT_ORDERINGS)}
          onChangeOrdering={handleChangeOrdering}
        />

        {hasProjects && (
          <CardList style={{ marginTop: '2rem' }}>
            {filteredProjects.map(project => {
              let rating = ratings.find(rating => rating.project_id === project.id);
              if (!rating) rating = { rating: 0, total_votes: 0 };
              return (
                <Card key={project.id} style={{ alignItems: 'flex-start' }}>
                  <LogoWrapper>
                    {project.pRep && project.pRep.logo && (
                      <Logo src={project.pRep.logo} alt={`${project.pRep.name} logo`} />
                    )}
                  </LogoWrapper>

                  <S.ProjectDetails>
                    <S.ProjectHeader>
                      <div>
                        <H2>
                          <UnstyledLink to={`/projects/${String(project.id)}`}>
                            {project.name}
                          </UnstyledLink>
                        </H2>
                        <Rating
                          overall={rating.rating}
                          total={rating.total_votes}
                          style={{ marginTop: '1rem' }}
                        />
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
              );
            })}
          </CardList>
        )}

        {!hasProjects && isLoading && <Text>Loading...</Text>}
        {hasProjects && !filteredProjects.length && (
          <Text>No projects found matching the search criteria.</Text>
        )}
      </S.Listing>
    </S.Container>
  );
}

ProjectList.propTypes = {
  title: PropTypes.string.isRequired,
  filtersToUse: PropTypes.shape({
    query: PropTypes.bool,
    category: PropTypes.bool,
    rating: PropTypes.bool,
    recent: PropTypes.bool,
    status: PropTypes.bool,
  }),
  additionalFilter: PropTypes.func,
};

export default ProjectList;
