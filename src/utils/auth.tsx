import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  token: string;
  setToken: () => void;
}

const AuthContext = createContext<AuthContextProps | any>(undefined);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const auth = useProvideToken();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideToken = () => {
  const localStorageToken = localStorage.getItem('token');
  const [token, setToken] = useState(localStorageToken || '');

  const handleSetToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const clearToken = () => {
    setToken('');
    localStorage.clear();
  };

  // Return the user object and auth methods
  return {
    token,
    handleSetToken,
    clearToken,
  };
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
