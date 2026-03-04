import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase, TrendingUp, Cpu, User, Lightbulb } from "lucide-react";
import { apiService } from '../services/api';

const navLinks = [
  { title: "Career Navigator", href: "/career-navigator", icon: <Cpu size={20} /> },
  { title: "Internships", href: "/internships", icon: <Briefcase size={20} /> },
  { title: "Skill Path", href: "/skill-path", icon: <TrendingUp size={20} /> },
  { title: "Career Insights", href: "/career-roadmap", icon: <Lightbulb size={20} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token') {
        checkAuthentication();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const checkAuthentication = async () => {
    try {
      setIsLoading(true);
      if (apiService.isAuthenticated()) {
        const storedUser = apiService.getStoredUser();
        if (storedUser) {
          setCurrentUser(storedUser);
        } else {
          const basicUser = {
            firstName: "User",
            email: "user@example.com", 
            profileCompletion: 60
          };
          setCurrentUser(basicUser);
          localStorage.setItem('user', JSON.stringify(basicUser));
        }
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Navbar auth check failed:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    checkAuthentication();
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setCurrentUser(null);
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      setCurrentUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const getDisplayName = () => {
    if (!currentUser) return 'User';
    if (currentUser.firstName && currentUser.lastName) return `${currentUser.firstName} ${currentUser.lastName}`;
    if (currentUser.firstName) return currentUser.firstName;
    if (currentUser.name) return currentUser.name;
    if (currentUser.email) return currentUser.email.split('@')[0];
    return 'User';
  };

  const getProfilePhoto = () => {
    return currentUser?.profilePhoto || null;
  };

  if (isLoading) {
    return (
      <nav className="bg-white border-b-2 border-violet-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
                <span className="text-violet-700">BPUT</span> Career Navigator
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const displayName = getDisplayName();
  const profilePhoto = getProfilePhoto();

  return (
    <nav className="bg-white border-b-2 border-violet-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-extrabold text-gray-900 tracking-tight transition duration-300 hover:text-violet-700"
            >
              <span className="text-violet-700">BPUT</span> Career Navigator
            </Link>
          </div>

          {/* Desktop Links */}
          {currentUser && (
            <div className="hidden lg:flex md:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  onClick={handleLinkClick}
                  className="relative text-gray-700 hover:text-violet-700 font-semibold px-3 py-2 text-sm transition-all duration-300 group flex items-center"
                >
                  {link.icon}
                  <span className="ml-1">{link.title}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ))}
            </div>
          )}

          {/* Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div 
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 bg-violet-50 px-4 py-2 rounded-xl border border-violet-100 hover:bg-violet-100 transition duration-300 cursor-pointer group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <span className="text-white text-sm font-semibold">
                          {displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-semibold text-sm leading-tight">
                        {displayName}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {currentUser.email || 'User'}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); refreshUserData(); }}
                      className="text-violet-600 hover:text-violet-800 text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Refresh user data"
                    >
                      🔄
                    </button>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-semibold rounded-lg transition duration-300 border border-gray-300 hover:border-red-300 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-violet-700 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center border border-gray-300 hover:border-violet-400 hover:bg-violet-50"
                >
                  <User size={18} className="mr-2" /> Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-violet-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 transition duration-150"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white border-t border-violet-100`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {currentUser && navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              onClick={handleLinkClick}
              className="text-gray-700 hover:bg-violet-50 hover:text-violet-700 block px-4 py-3 rounded-lg text-base font-semibold transition duration-300 flex items-center"
            >
              <span className="mr-3">{link.icon}</span>
              {link.title}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="pt-4 border-t border-violet-100 space-y-2">
            {currentUser ? (
              <>
                <div 
                  onClick={handleProfileClick}
                  className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl flex items-center border border-violet-200 cursor-pointer hover:bg-violet-100 transition duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-md overflow-hidden">
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">{displayName}</p>
                    <p className="text-gray-600 text-xs">{currentUser.email || 'User'}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); refreshUserData(); }}
                    className="text-violet-600 hover:text-violet-800 text-xs ml-auto"
                    title="Refresh user data"
                  >
                    🔄
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-center text-red-600 hover:bg-red-50 px-4 py-3 text-base font-semibold rounded-lg transition duration-300 flex items-center justify-center border border-red-200"
                >
                  <span className="mr-2">🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="text-violet-600 hover:bg-violet-50 block px-4 py-3 text-base font-semibold rounded-lg transition duration-300 flex items-center border border-violet-200"
              >
                <User size={20} className="mr-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;