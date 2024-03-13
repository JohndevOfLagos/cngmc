import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/*  FIREBASE  */

import { auth } from 'config/firebase-config';


/* END OF FIREBASE*/

export const PrivateRoutes = () => {
  return (
   !!auth.currentUser !== undefined ? <Outlet /> : <Navigate to="/login" />
)
    
}

export default PrivateRoutes;


