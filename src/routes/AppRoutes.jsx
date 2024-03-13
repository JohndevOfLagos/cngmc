// AppRoutes.js
import React, { useState} from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "pages/home/Home";
import { NotFound } from "pages/NotFound/NotFound";
import { Login } from "pages/Login/Login";
import { NewRegistration } from "pages/NewRegistration/NewRegistration";
import { ContentManagement } from "layout/ContentManagement";
import { EmailverificationSend } from "pages/EmailverificationSend/EmailverificationSend";
import PrivateRoutes from "utils/PrivateRoutes";
import { ForgetPassword } from "pages/ForgetPassword/ForgetPassword";







// Initialize Firebas
// const analytics = getAnalytics(app);

export const AppRoutes = () => {
  const [user, setUser] = useState(null);




  //
    // eslint-disable-next-line no-unused-vars

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  // eslint-disable-next-line no-unused-vars
  const handleLogin = (user) => {
    setUser(user);
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    setUser(null);
  };

    // Signout the user


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes />}>
        <Route
          path="/user/*"
          element={<ContentManagement  handleLogout={handleLogout} />}/>
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/user/forgot-password/" element={<ForgetPassword />} />
      <Route path="/user/email-verification-sent/" element={<EmailverificationSend />} />
      <Route path="/user/signup/Account" element={<NewRegistration />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;