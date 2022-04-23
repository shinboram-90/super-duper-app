import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize the state with the default value of the LS to keep our user logged in, if empty then it returns an empty object
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
