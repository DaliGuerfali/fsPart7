import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  Togglable.displayName = 'Togglable';

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button sx={{ mt: 3, mb: 3, }} variant="outlined" onClick={toggleVisibility}>cancel</Button>
      </div>
    </>
  );
});

export default Togglable;
