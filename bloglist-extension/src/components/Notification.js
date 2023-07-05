import { useContext } from 'react';
import NotifContext, { clearNotif } from '../context/NotifContext';
import { Alert } from '@mui/material';

const Notification = () => {
  const [notification, dispatchNotif] = useContext(NotifContext);

  if (notification) {
    setTimeout(() => {
      dispatchNotif(clearNotif());
    }, 5000);
    return <Alert sx={{ mb: 5 }} severity={notification.class}>{notification.message}</Alert>;
  } else {
    return null;
  }
};

export default Notification;
