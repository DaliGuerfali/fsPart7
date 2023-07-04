import { useContext } from 'react';
import NotifContext, { clearNotif } from '../context/NotifContext';

const Notification = () => {
  const [notification, dispatchNotif] = useContext(NotifContext);

  if (notification) {
    setTimeout(() => {
      dispatchNotif(clearNotif());
    }, 5000);
    return <div className={notification.class}>{notification.message}</div>;
  } else {
    return null;
  }
};

export default Notification;
