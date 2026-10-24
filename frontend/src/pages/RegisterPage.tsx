import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, Lock, Mail, User as UserIcon, Building2, ArrowRight, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('researcher');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, role, institution });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="card-scientific max-w-md w-full space-y-6 p-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest mx-auto flex items-center justify-center text-white shadow-subtle">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-forest">Create Research Account</h2>
          <p className="text-xs text-neutralgrey">
            Register to conduct crop analyses, track disease epidemiology, and export diagnostic datasets.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-agrired flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="name">
              <UserIcon className="w-3.5 h-3.5 text-neutralgrey" />
              Full Name / Investigator
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Jane Doe or Student Name"
              className="input-field"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="email">
              <Mail className="w-3.5 h-3.5 text-neutralgrey" />
              Academic Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="investigator@university.edu"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal" htmlFor="role">
                User Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field cursor-pointer"
              >
                <option value="researcher">Researcher</option>
                <option value="agronomist">Agronomist</option>
                <option value="student">Student / Scholar</option>
                <option value="evaluator">Evaluator</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="institution">
                <Building2 className="w-3 h-3 text-neutralgrey" />
                Affiliation
              </label>
              <input
                id="institution"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Dept of CSE / Agriculture"
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal flex items-center gap-1.5" htmlFor="password">
              <Lock className="w-3.5 h-3.5 text-neutralgrey" />
              Password (min. 6 characters)
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
            className="btn-primary w-full py-2.5 text-sm mt-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutralgrey-border/60">
          <p className="text-xs text-neutralgrey">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-agri hover:underline">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
