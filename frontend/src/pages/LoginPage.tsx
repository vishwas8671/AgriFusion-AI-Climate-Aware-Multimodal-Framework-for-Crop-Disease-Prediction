import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('evaluator@university.edu');
  const [password, setPassword] = useState('AgriFusion@2026');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card-scientific max-w-md w-full space-y-6 p-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest mx-auto flex items-center justify-center text-white shadow-subtle">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-forest">Sign In to AgriFusion AI</h2>
          <p className="text-xs text-neutralgrey">
            Enter your credentials to manage crop analyses, historical diagnoses, and microclimate risk telemetry.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-agrired flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="email">
              <Mail className="w-3.5 h-3.5 text-neutralgrey" />
              Academic / Agronomist Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="evaluator@university.edu"
              className="input-field"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="password">
              <Lock className="w-3.5 h-3.5 text-neutralgrey" />
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-2.5 text-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        {/* Quick Demo Access for Evaluators */}
        <div className="pt-4 border-t border-neutralgrey-border/60 space-y-3">
          <div className="text-center">
            <span className="text-[11px] font-mono text-neutralgrey uppercase">University Defense Mode</span>
          </div>
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2.5 px-4 rounded-md bg-sage/80 hover:bg-sage border border-neutralgrey-border text-forest text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-agri" />
            1-Click Academic Evaluator Access
          </button>
          <p className="text-[10px] text-center text-neutralgrey">
            Pre-fills evaluation credentials for examiners and conference reviewers.
          </p>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-neutralgrey">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-agri hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
