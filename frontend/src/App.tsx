import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiseaseAnalysisPage } from './pages/DiseaseAnalysisPage';
import { PredictionResultsPage } from './pages/PredictionResultsPage';
import { EnvironmentalAnalysisPage } from './pages/EnvironmentalAnalysisPage';
import { DiseaseRiskPage } from './pages/DiseaseRiskPage';
import { AnalysisHistoryPage } from './pages/AnalysisHistoryPage';
import { ResearchPage } from './pages/ResearchPage';
import { DatasetsPage } from './pages/DatasetsPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsPage } from './pages/SettingsPage';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-offwhite text-charcoal font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analyze" element={<DiseaseAnalysisPage />} />
              <Route path="/results/:id" element={<PredictionResultsPage />} />
              <Route path="/environment" element={<EnvironmentalAnalysisPage />} />
              <Route path="/risk" element={<DiseaseRiskPage />} />
              <Route path="/history" element={<AnalysisHistoryPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/datasets" element={<DatasetsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Catch-all redirect to home */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
