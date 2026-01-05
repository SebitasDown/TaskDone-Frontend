import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const Alert = ({ message, isError }) => {
  if (!message) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
      {isError ? (
        <ExclamationCircleIcon style={{ width: '20px', color: 'red' }} />
      ) : (
        <CheckCircleIcon style={{ width: '20px', color: 'green' }} />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Alert;