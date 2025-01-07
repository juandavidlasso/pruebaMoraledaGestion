'use client';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { AlertContext } from '@/context/Alerts/AlertContext';

const AlertModal = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={1} ref={ref} variant='filled' {...props} />;
});

interface Props {}

export const Alert: React.FC<Props> = ({}) => {
    const [mounted, setMounted] = useState(false);
    const { infoMessage, showMessage, messageType, setShowMessage } = useContext(AlertContext);
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowMessage(false);
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted
        ? ReactDOM.createPortal(
              <Snackbar
                  open={showMessage}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                  }}
              >
                  <AlertModal onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                      {infoMessage}
                  </AlertModal>
              </Snackbar>,
              document.body
          )
        : null;
};

export default Alert;
