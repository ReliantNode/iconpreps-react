import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginModal from 'components/LoginModal';
import * as authApi from 'utils/authApi';

const INITIAL_STATE = {
  authUser: null,
  isAuthenticated: false,
  login: null,
  logout: null,
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
    authApi.getAuthUser().then(authUser => {
      if (authUser) {
        setAuthUser(authUser);
        setIsAuthenticated(true);
      }
    });
  }, []);

  function showLoginModal() {
    setIsLoggingIn(true);
  }

  async function login(address, signature) {
    await authApi.login(address, signature);
    const authUser = await authApi.getAuthUser();
    setAuthUser(authUser);
    setIsAuthenticated(true);
  }

  async function logout() {
    await authApi.logout();
    setIsAuthenticated(false);
    setAuthUser(null);
  }

  return (
    <AuthContext.Provider value={{ authUser, isAuthenticated, login, logout, showLoginModal }}>
      {children}
      <LoginModal isOpen={isLoggingIn} onClose={() => setIsLoggingIn(false)} />
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node,
};

export default Auth;
