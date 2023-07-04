import { createContext, useContext, useReducer } from 'react';

const userReducer = (state, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.payload;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};


export const userLogin = (payload) => {
  return {
    type: 'LOGIN',
    payload
  };
};

export const userLogout = () => {
  return { type: 'LOGOUT' };
};

const UserContext = createContext();


export const UserContextProvider = ({ children }) => {
  const [user, disptachUser] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, disptachUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext)[0];
};

export const useDispatchUser = () => {
  return useContext(UserContext)[1];
};


export default UserContext;