import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

const AuthDebug = () => {
  const { user, isAuthenticated, isAdmin, debugAuth } = useContext(AuthContext);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h4>Auth Debug Info</h4>
      <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
      <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
      <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
      <button onClick={debugAuth} style={{ marginRight: '5px' }}>
        Log Auth Info
      </button>
      <button onClick={() => localStorage.clear()}>
        Clear Storage
      </button>
    </div>
  );
};

export default AuthDebug;
