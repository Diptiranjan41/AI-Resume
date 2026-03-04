// Components/Register.jsx - UPDATED TO WORK WITH YOUR BACKEND
import React, { useState } from 'react';
import { apiService, apiUtils } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    isStrong: false,
    issues: [],
    suggestions: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (error) setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    if (name === 'email' && formData.email) {
      const emailValidation = apiUtils.validateEmail(formData.email);
      if (!emailValidation.valid) {
        setError(emailValidation.error);
      }
    }

    if (name === 'password' && formData.password) {
      checkPasswordStrength(formData.password);
    }

    if (name === 'confirmPassword' && formData.confirmPassword && formData.password) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
      }
    }
  };

  const checkPasswordStrength = (password) => {
    const validation = apiUtils.validatePassword(password);
    setPasswordStrength({
      isStrong: validation.valid,
      issues: validation.issues,
      suggestions: validation.suggestions
    });
  };

  const validateForm = () => {
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }

    const emailValidation = apiUtils.validateEmail(formData.email);
    if (!emailValidation.valid) {
      setError(emailValidation.error);
      return false;
    }

    const passwordValidation = apiUtils.validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.issues[0] || 'Invalid password');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔄 Attempting registration...');
      
      // Your backend expects these field names
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      console.log('📤 Sending registration data to /api/auth/register');

      const result = await apiService.register(userData);
      
      console.log('✅ Registration successful:', result);
      
      setSuccess('Account created successfully!');
      
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      setTouched({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      let errorMessage = error.message || 'Registration failed';
      
      if (errorMessage.includes('already exists')) {
        errorMessage = 'Email already registered';
      } else if (errorMessage.includes('Network error')) {
        errorMessage = 'Cannot connect to server';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordStrengthIndicator = () => {
    if (!formData.password) return null;

    const getStrength = () => {
      if (passwordStrength.isStrong) return { level: 'strong', width: '100%' };
      if (formData.password.length >= 6 && passwordStrength.issues.length <= 1) {
        return { level: 'medium', width: '66%' };
      }
      return { level: 'weak', width: '33%' };
    };

    const strength = getStrength();

    return (
      <div className="mt-2">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: strength.width }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          <div className={`flex items-center ${formData.password.length >= 6 ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className="mr-1">{formData.password.length >= 6 ? '✓' : '○'}</span>
            <span>6+ chars</span>
          </div>
          <div className={`flex items-center ${/\d/.test(formData.password) ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className="mr-1">{/\d/.test(formData.password) ? '✓' : '○'}</span>
            <span>Number</span>
          </div>
          <div className={`flex items-center ${/[a-zA-Z]/.test(formData.password) ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className="mr-1">{/[a-zA-Z]/.test(formData.password) ? '✓' : '○'}</span>
            <span>Letter</span>
          </div>
          <div className={`flex items-center ${!/^\d+$/.test(formData.password) ? 'text-blue-600' : 'text-gray-400'}`}>
            <span className="mr-1">{!/^\d+$/.test(formData.password) ? '✓' : '○'}</span>
            <span>Mix</span>
          </div>
        </div>
      </div>
    );
  };

  const getFieldError = (fieldName) => {
    if (!touched[fieldName]) return null;
    
    switch (fieldName) {
      case 'name':
        return formData.name.length < 2 ? 'Name too short' : null;
      case 'email':
        if (!formData.email) return 'Email required';
        const emailValidation = apiUtils.validateEmail(formData.email);
        return !emailValidation.valid ? 'Invalid email' : null;
      case 'password':
        if (!formData.password) return 'Password required';
        const passwordValidation = apiUtils.validatePassword(formData.password);
        return !passwordValidation.valid ? 'Weak password' : null;
      case 'confirmPassword':
        if (!formData.confirmPassword) return 'Confirm password';
        return formData.password !== formData.confirmPassword ? 'Passwords do not match' : null;
      default:
        return null;
    }
  };

  const isFieldValid = (fieldName) => {
    if (!touched[fieldName]) return true;
    return !getFieldError(fieldName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-semibold text-blue-600">
              CareerConnect
            </Link>
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-blue-600"
              >
                Sign in
              </Link>
              <Link 
                to="/" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-1">Join CareerConnect</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                  isFieldValid('name') ? 'border-gray-300' : 'border-red-300'
                }`}
                placeholder="Your name"
                required
                disabled={isLoading}
              />
              {!isFieldValid('name') && (
                <p className="mt-1 text-xs text-red-500">{getFieldError('name')}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${
                  isFieldValid('email') ? 'border-gray-300' : 'border-red-300'
                }`}
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
              {!isFieldValid('email') && (
                <p className="mt-1 text-xs text-red-500">{getFieldError('email')}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 ${
                    isFieldValid('password') ? 'border-gray-300' : 'border-red-300'
                  }`}
                  placeholder="Create password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  disabled={isLoading}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <PasswordStrengthIndicator />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-10 ${
                    isFieldValid('confirmPassword') ? 'border-gray-300' : 'border-red-300'
                  }`}
                  placeholder="Confirm password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {!isFieldValid('confirmPassword') && (
                <p className="mt-1 text-xs text-red-500">{getFieldError('confirmPassword')}</p>
              )}
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-600">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !passwordStrength.isStrong}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;