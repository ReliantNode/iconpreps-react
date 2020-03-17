import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getAuthUser } from 'utils/authApi';

const INITIAL_STATE = {
  authUser: null,
  isAuthenticated: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export function useAuth() {
  return useContext(AuthContext);
}

function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(INITIAL_STATE.isAuthenticated);
  const [authUser, setAuthUser] = useState(INITIAL_STATE.authUser);

  useEffect(() => {
    getAuthUser().then(me => {
      console.log('ME!', me);
      if (me) {
        setIsAuthenticated(true);
        setAuthUser(me);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
