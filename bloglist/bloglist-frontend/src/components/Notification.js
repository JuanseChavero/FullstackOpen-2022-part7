import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) return null;

  return (
    <Snackbar open={!!notification.message} id="message">
      <Alert
        severity={notification.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
