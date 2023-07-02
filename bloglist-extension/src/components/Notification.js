import PropTypes from 'prop-types';

const Notification = ({ notif, setNotification }) => {
  Notification.propTypes = {
    notif: PropTypes.object,
    setNotification: PropTypes.func.isRequired,
  };

  if (notif) {
    setTimeout(() => {
      setNotification(null);
    }, 2000);
    return <div className={notif.class}>{notif.message}</div>;
  } else {
    return null;
  }
};

export default Notification;
