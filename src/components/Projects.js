import React, { createContext, useContext, useEffect, useState } from 'react';
import { pick } from 'lodash-es';
import PropTypes from 'prop-types';
import { usePReps } from 'components/PReps';
import * as feedbackApi from 'utils/feedbackApi';
import * as projectsApi from 'utils/projectsApi';

const INITIAL_STATE = {
  addFeedback: null,
  deleteFeedback: null,
  getFilters: null,
  getProjects: null,
  hasFilters: false,
  hasProjects: false,
  isLoading: true,
};

export const ProjectsContext = createContext(INITIAL_STATE);

export function useProjects() {
  return useContext(ProjectsContext);
}

function Projects({ children }) {
  const { getPReps, hasPReps } = usePReps();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [hasProjects, setHasProjects] = useState(INITIAL_STATE.hasProjects);
  const [hasFilters, setHasFilters] = useState(INITIAL_STATE.hasFilters);

  useEffect(() => {
    if (hasPReps) loadProjects();
  }, [hasPReps]); // eslint-disable-line

  useEffect(() => void loadFilters(), []);

  async function loadProjects() {
    const [projects, ratings] = await Promise.all([
      projectsApi.getAllProjects(),
      feedbackApi.getAllRatings(),
    ]);

    const pReps = getPReps();
    setProjects(
      projects.map(project => {
        let rating = ratings.find(rating => rating.project_id === project.id);
        if (rating) rating = pick(rating, ['rating', 'rating_count', 'total_ratings']);
        else rating = { rating: 0, rating_count: 0, total_ratings: 0 };

        const pRep = pReps.find(pRep => pRep.address === project.prep_address) || null;

        return { ...project, ...rating, pRep };
      })
    );

    setIsLoading(false);
    setHasProjects(true);
  }

  async function loadFilters() {
    const filters = await projectsApi.getFilters();
    setFilters(filters);
    setHasFilters(true);
  }

  async function updateProjectRating(projectId) {
    const { rating, rating_count, total_ratings } = await feedbackApi.getRating(projectId);
    const index = projects.findIndex(project => project.id === projectId);
    const project = projects[index];
    project.rating = rating;
    project.rating_count = rating_count;
    project.total_ratings = total_ratings;
    setProjects([...projects.slice(0, index), project, ...projects.slice(index + 1)]);
  }

  async function addFeedback(projectId, rating, comment) {
    await feedbackApi.addFeedback(projectId, rating, comment);
    return updateProjectRating(projectId);
  }

  async function deleteFeedback(projectId, feedbackId) {
    await feedbackApi.deleteFeedback(feedbackId);
    return updateProjectRating(projectId);
  }

  function getProjects() {
    return projects;
  }

  function getFilters() {
    return filters;
  }

  return (
    <ProjectsContext.Provider
      value={{
        addFeedback,
        deleteFeedback,
        getFilters,
        getProjects,
        hasFilters,
        hasProjects,
        isLoading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

Projects.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Projects;
