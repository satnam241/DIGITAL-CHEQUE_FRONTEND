import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ChequePrinting from './pages/ChequePrinting';
import Herosection from './pages/Herosection';
import ProtectedRoute from './pages/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Plans from './pages/Plans';
import WizardForm from './components/Wizard/WizardForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard'
import HelpCenter from './support-pages/HelpCenter'
import ContactUs from './support-pages/ContactUs'
import PrivacyPolicy from './support-pages/PrivacyPolicy'
import TermsOfService from './support-pages/TermsOfService'
import './App.css';

function App() {
  return (
    
      <AuthProvider>
        <div className="App flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Herosection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/payment-wizard" element={<WizardForm />} />
              <Route path="/reset-password/:token" element={<Login/>} />
              
              {/* Protected Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cheque-printing" 
                element={
                  <ProtectedRoute>
                    <ChequePrinting />
                  </ProtectedRoute>
                } 
              />
              <Route path="/help-center" element={<HelpCenter />} />
<Route path="/contact-us" element={<ContactUs />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-of-service" element={<TermsOfService />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
   
  );
}

export default App;
