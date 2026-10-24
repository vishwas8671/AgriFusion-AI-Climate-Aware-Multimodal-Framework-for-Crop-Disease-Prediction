import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Sprout,
  LayoutDashboard,
  Microscope,
  CloudSun,
  AlertTriangle,
  History,
  BookOpen,
  Database,
  Info,
  Settings,
  LogOut,
  LogIn,
  Menu,
  X,
  Activity
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Disease Analysis', path: '/analyze', icon: Microscope },
    { name: 'Microclimate', path: '/environment', icon: CloudSun },
    { name: 'Risk Forecast', path: '/risk', icon: AlertTriangle },
    { name: 'History', path: '/history', icon: History },
    { name: 'Research', path: '/research', icon: BookOpen },
    { name: 'Model Registry', path: '/datasets', icon: Database },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutralgrey-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-forest flex items-center justify-center text-white shadow-subtle group-hover:bg-agri transition-colors">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-forest tracking-tight">AgriFusion<span className="text-agri">AI</span></span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sage text-forest font-semibold border border-neutralgrey-border/60">
                  v1.0-ML
                </span>
              </div>
              <p className="text-[11px] text-neutralgrey leading-none">Multimodal Crop Disease & Risk Warning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    active
                      ? 'bg-agri-subtle text-agri font-semibold border border-agri/30'
                      : 'text-charcoal hover:text-forest hover:bg-sage/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-agri' : 'text-neutralgrey'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Status & Auth Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* System Status Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sage/60 border border-neutralgrey-border/60 text-[11px] font-mono text-forest">
              <Activity className="w-3 h-3 text-agri animate-pulse" />
              <span>EfficientNet-B0</span>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-sage/40 text-xs font-medium text-charcoal border border-transparent hover:border-neutralgrey-border/60"
                  title="User Profile & Settings"
                >
                  <div className="w-6 h-6 rounded-full bg-agri/10 text-agri flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-1.5 rounded-md text-neutralgrey hover:text-agrired hover:bg-red-50 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-xs py-1.5 px-3">
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </Link>
                <Link to="/analyze" className="btn-primary text-xs py-1.5 px-3">
                  <Microscope className="w-3.5 h-3.5" />
                  Analyze Crop
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-charcoal hover:bg-sage/60 border border-neutralgrey-border/60"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutralgrey-border bg-white px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium ${
                  active ? 'bg-agri-subtle text-agri font-semibold' : 'text-charcoal hover:bg-sage/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-neutralgrey-border/60 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal"
                >
                  <Settings className="w-4 h-4" />
                  Settings ({user?.name})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-agrired hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-secondary w-full text-center text-xs py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/analyze"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full text-center text-xs py-2"
                >
                  Analyze Crop
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
