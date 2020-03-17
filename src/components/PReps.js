import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAllPReps } from 'utils/pRepsApi';

const INITIAL_STATE = {
  getPReps: null,
  hasPReps: false,
  isLoading: true,
};

export const PRepsContext = createContext(INITIAL_STATE);

export function usePReps() {
  return useContext(PRepsContext);
}

function PReps({ children }) {
  const [pReps, setPReps] = useState([]);
  const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
  const [hasPReps, setHasPReps] = useState(INITIAL_STATE.hasPReps);

  useEffect(() => void loadPReps(), []);

  async function loadPReps() {
    const pReps = await getAllPReps();
    setPReps(pReps);
    setIsLoading(false);
    setHasPReps(true);
  }

  function getPReps() {
    return pReps;
  }

  return (
    <PRepsContext.Provider value={{ getPReps, hasPReps, isLoading }}>
      {children}
    </PRepsContext.Provider>
  );
}

PReps.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PReps;
