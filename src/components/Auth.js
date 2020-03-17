import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginModal from 'components/LoginModal';
import { getAuthUser } from 'utils/authApi';

const INITIAL_STATE = {
  authUser: null,
  isAuthenticated: false,
  showLoginModal: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export function useAuth() {
  return useContext(AuthContext);
}

function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(INITIAL_STATE.isAuthenticated);
  const [authUser, setAuthUser] = useState(INITIAL_STATE.authUser);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    getAuthUser().then(me => {
      if (me) {
        setIsAuthenticated(true);
        setAuthUser(me);
      }
    });
  }, []);

  function showLoginModal() {
    setIsLoggingIn(true);
  }

  return (
    <AuthContext.Provider value={{ authUser, isAuthenticated, showLoginModal }}>
      {children}
      <LoginModal isOpen={isLoggingIn} onClose={() => setIsLoggingIn(false)} />
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
