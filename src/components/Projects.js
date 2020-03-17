import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePReps } from 'components/PReps';
import { getAllRatings } from 'utils/feedbackApi';
import { getAllProjects } from 'utils/projectsApi';

const INITIAL_STATE = {
  getProjects: null,
  getRatings: null,
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
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [hasProjects, setHasProjects] = useState(INITIAL_STATE.hasProjects);

  useEffect(() => {
    if (hasPReps) loadProjects();
  }, [hasPReps]); // eslint-disable-line

  async function loadProjects() {
    const [projects, ratings] = await Promise.all([getAllProjects(), getAllRatings()]);
    setRatings(ratings);

    const pReps = getPReps();
    setProjects(
      projects.map(project => {
        const pRep = pReps.find(pRep => pRep.address === project.prep_address) || null;
        return { ...project, pRep };
      })
    );

    setIsLoading(false);
    setHasProjects(true);
  }

  function getProjects() {
    return projects;
  }

  function getRatings() {
    return ratings;
  }

  return (
    <ProjectsContext.Provider value={{ getProjects, getRatings, hasProjects, isLoading }}>
      {children}
    </ProjectsContext.Provider>
  );
}

Projects.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Projects;
