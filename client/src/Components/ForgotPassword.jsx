// Components/ForgotPassword.jsx - Advanced UI with White, Purple & Blue
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ApiService from '../services/api';

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // States for email step
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    // States for reset step
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    // Current step: 'email' or 'reset'
    const [step, setStep] = useState('email');
    const [resetInfo, setResetInfo] = useState(null);

    // Check for token in URL on component mount
    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
            setStep('reset');
        }
    }, [searchParams]);

    // Check password strength
    useEffect(() => {
        if (password) {
            let strength = 0;
            if (password.length >= 6) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[a-z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    // Handle forgot password submission
    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        setResetInfo(null);

        try {
            console.log('🔄 Sending forgot password request for:', email);
            const response = await ApiService.forgotPassword(email);
            console.log('✅ Response:', response);
            
            if (response.success) {
                // If in development mode and token is returned
                if (response.development_mode && response.reset_token) {
                    setResetInfo({
                        token: response.reset_token,
                        link: response.reset_link,
                        expires: response.expires_in
                    });
                    setMessage('Development mode: Use the token below to reset your password.');
                } else {
                    setMessage('Password reset instructions have been sent to your email.');
                    setEmail('');
                }
            } else {
                setError(response.message || 'Failed to send reset instructions');
            }
        } catch (err) {
            console.error('❌ Error:', err);
            setError(err.message || 'Failed to send reset instructions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle password reset submission
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await ApiService.resetPassword(token, password);
            
            if (response.success) {
                setMessage('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    // Use token from development mode
    const useDevToken = () => {
        if (resetInfo?.token) {
            setToken(resetInfo.token);
            setStep('reset');
            setMessage('');
            setResetInfo(null);
        }
    };

    // Copy token to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Token copied to clipboard!');
        });
    };

    // Get password strength color
    const getStrengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    // Get password strength text
    const getStrengthText = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            {/* Navigation */}
            <nav className="relative z-10 border-b border-purple-100 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            CareerConnect
                        </Link>
                        <div className="space-x-4">
                            <Link 
                                to="/login" 
                                className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                            <Link 
                                to="/" 
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-md mx-auto px-4 py-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-100">
                    
                    {/* Header - Changes based on step */}
                    <div className="text-center mb-8">
                        {step === 'email' ? (
                            <>
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <span className="text-white text-3xl">🔐</span>
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Forgot Password
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Enter your email to reset your password
                                </p>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <span className="text-white text-3xl">🔄</span>
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Reset Password
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Create a new password
                                </p>
                            </>
                        )}
                    </div>

                    {/* Email Step Form */}
                    {step === 'email' && (
                        <form onSubmit={handleForgotSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/70 backdrop-blur-sm pl-10"
                                        placeholder="your@email.com"
                                        required
                                        disabled={loading}
                                    />
                                    <span className="absolute left-3 top-3.5 text-gray-400">📧</span>
                                </div>
                            </div>

                            {/* Success Message */}
                            {message && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-600">{message}</p>
                                </div>
                            )}

                            {/* Development Mode Token Display */}
                            {resetInfo && (
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-purple-800 mb-2">Development Token</h4>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="text"
                                            value={resetInfo.token}
                                            readOnly
                                            className="flex-1 px-3 py-2 bg-white border border-purple-200 rounded-lg text-sm font-mono"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(resetInfo.token)}
                                            className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            type="button"
                                            onClick={useDevToken}
                                            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                        >
                                            Use This Token
                                        </button>
                                    </div>
                                    <p className="text-xs text-purple-600 mt-2">
                                        Expires in: {resetInfo.expires}
                                    </p>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>
                    )}

                    {/* Reset Password Step Form */}
                    {step === 'reset' && (
                        <form onSubmit={handleResetSubmit} className="space-y-6">
                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/70 backdrop-blur-sm pl-10"
                                        placeholder="Enter new password"
                                        required
                                        disabled={loading}
                                    />
                                    <span className="absolute left-3 top-3.5 text-gray-400">🔑</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-600"
                                    >
                                        {showPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                
                                {/* Password Strength Meter */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-600">Password Strength:</span>
                                            <span className="text-xs font-medium" style={{ 
                                                color: passwordStrength <= 25 ? '#ef4444' : 
                                                       passwordStrength <= 50 ? '#f97316' : 
                                                       passwordStrength <= 75 ? '#eab308' : '#22c55e' 
                                            }}>
                                                {getStrengthText()}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/70 backdrop-blur-sm pl-10"
                                        placeholder="Confirm new password"
                                        required
                                        disabled={loading}
                                    />
                                    <span className="absolute left-3 top-3.5 text-gray-400">✓</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400 hover:text-purple-600"
                                    >
                                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                                )}
                            </div>

                            {/* Success Message */}
                            {message && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-sm text-green-600">{message}</p>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                                        Resetting...
                                    </div>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>

                            {/* Back to Email Step */}
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="w-full text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors duration-200"
                            >
                                ← Back to Email
                            </button>
                        </form>
                    )}

                    {/* Back to Login Link */}
                    {step === 'email' && (
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Remember your password?{' '}
                                <Link 
                                    to="/login" 
                                    className="text-purple-600 hover:text-blue-600 font-semibold transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                {/* Email Configuration Status */}
                {step === 'email' && (
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Secure password reset • 15 minute expiry
                        </p>
                    </div>
                )}
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default ForgotPassword;