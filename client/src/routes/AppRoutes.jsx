import { Routes, Route, Navigate } from 'react-router-dom';

/* LAYOUT */
import Layout from '@/layouts/Layout';

/* PUBLIC & PRIVATE ROUTE */
import PublicRoute from '@/routes/PublicRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

/* START USER PAGES */

// CHAT
import Chat from '@/pages/Chat';

// PROFILE
import Profile from '@/pages/Profile';

// SETTINGS
import Settings from '@/pages/Settings';

/* END USER PAGES */

/* START AUTH PAGES */

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ForgotPasswordSuccess from '@/pages/auth/ForgotPasswordSuccess';
import ResetPassword from '@/pages/auth/ResetPassword';
import EmailVerification from '@/pages/auth/EmailVerification';

// AUTH ERROR
import AuthError from '@/pages/auth/Error';

/* END AUTH PAGES */

// 404 PAGE
import NotFound from '@/pages/NotFound';

const AppRoutes = () => {
	return (
		<Routes>

      {/* USER PAGES */}
      <Route element={<ProtectedRoute />}>
        <Route exact strict path="/" element={<Navigate to="/chat" />} />
        <Route element={<Layout />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
        
			{/* AUTH PAGES */}
      <Route element={<PublicRoute />}>
        <Route path="/auth/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password-success" element={<ForgotPasswordSuccess />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
          <Route path="email-verification/:id" element={<EmailVerification />} />
        </Route>
      </Route>

      <Route path="/auth/">
        {/* AUTH ERROR */}
        <Route path="error" element={<AuthError/>} />
      </Route>

      {/* 404 PAGE */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default AppRoutes;