import { createContext, useContext, useReducer } from 'react';

const notifReducer = (state, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.payload;
  case 'CLEAR':
    return null;
  default:
    return state;
  }
};

export const notify = (payload) => {
  return {
    type: 'NOTIFY',
    payload
  };
};

export const clearNotif = () => {
  return { type: 'CLEAR' };
};

const NotifContext = createContext();

export const NotifContextProvider = ({ children }) => {
  const [notification, notifDispatch] = useReducer(notifReducer, null);

  return (
    <NotifContext.Provider value={[notification, notifDispatch]}>
      {children}
    </NotifContext.Provider>
  );
};


export const useDispatchNotif = () => {
  return useContext(NotifContext)[1];
};

export default NotifContext;