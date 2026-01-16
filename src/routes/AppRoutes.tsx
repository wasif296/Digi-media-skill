import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home'; 
import LoginPage from '../admin/loginPage';
import AdminDashboard from '../admin/adminDashboard';
import ProtectedRoute from '../components/ProtectedRoute'; // 1. Isay import lazmi karein

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 2. Public Page: Everyone can see this */}
        <Route path="/" element={<HomePage />} />

        {/* 3. Login Page: Only accessible before login */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        {/* 4. Secure Dashboard: Protected by ProtectedRoute */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* 5. Fallback: Ghalat URL likhne par Home par bhej do */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;