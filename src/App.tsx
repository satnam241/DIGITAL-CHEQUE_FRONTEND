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

              {/* Protected Routes */}
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
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
   
  );
}

export default App;
