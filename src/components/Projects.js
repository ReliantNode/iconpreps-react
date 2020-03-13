import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePReps } from 'components/PReps';

const PROJECTS_ENDPOINT = `${process.env.REACT_APP_COMMUNITY_API}/prep-projects/`;

const INITIAL_STATE = {
  getProjects: null,
  hasProjects: false,
  isLoading: true,
};

export const ProjectsContext = createContext(INITIAL_STATE);

export function useProjects() {
  return useContext(ProjectsContext);
}

async function loadAllProjects(nextRequest, allProjects = []) {
  if (!nextRequest) return allProjects;
  const response = await fetch(nextRequest);
  const { next, results } = await response.json();
  return await loadAllProjects(next, allProjects.concat(results));
}

function Projects({ children }) {
  const { getPReps, hasPReps } = usePReps();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [hasProjects, setHasProjects] = useState(INITIAL_STATE.hasProjects);

  useEffect(() => {
    if (hasPReps) loadProjects();
  }, [hasPReps]); // eslint-disable-line

  async function loadProjects() {
    const projects = await loadAllProjects(`${PROJECTS_ENDPOINT}?limit=50&ordering=created_date`);
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

  return (
    <ProjectsContext.Provider value={{ getProjects, hasProjects, isLoading }}>
      {children}
    </ProjectsContext.Provider>
  );
}

Projects.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Projects;
