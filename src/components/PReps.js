import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as pRepsApi from 'utils/pRepsApi';

const INITIAL_STATE = {
  getFilters: null,
  getPReps: null,
  hasFilters: false,
  hasPReps: false,
  isLoading: true,
};

export const PRepsContext = createContext(INITIAL_STATE);

export function usePReps() {
  return useContext(PRepsContext);
}

function PReps({ children }) {
  const [pReps, setPReps] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [hasPReps, setHasPReps] = useState(INITIAL_STATE.hasPReps);
  const [hasFilters, setHasFilters] = useState(INITIAL_STATE.hasFilters);

  useEffect(() => void loadPReps(), []);
  useEffect(() => void loadFilters(), []);

  async function loadPReps() {
    const pReps = await pRepsApi.getAllPReps();
    setPReps(pReps);
    setIsLoading(false);
    setHasPReps(true);
  }

  async function loadFilters() {
    const filters = await pRepsApi.getFilters();
    setFilters(filters);
    setHasFilters(true);
  }

  function getPReps() {
    return pReps;
  }

  function getFilters() {
    return filters;
  }

  return (
    <PRepsContext.Provider value={{ getFilters, getPReps, hasFilters, hasPReps, isLoading }}>
      {children}
    </PRepsContext.Provider>
  );
}

PReps.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PReps;
