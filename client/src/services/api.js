// services/api.js - COMPLETE FIXED CODE WITH ENHANCED ERROR HANDLING (PROFILE & INTERVIEW FUNCTIONS REMOVED)
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token') || null;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getToken() {
    return this.token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Remove Content-Type for FormData requests
    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Add authorization header if token exists
    if (this.token && !endpoint.includes('/auth/reset-password') && !endpoint.includes('/auth/forgot-password')) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      console.log(`🔄 API Call: ${config.method || 'GET'} ${url}`);
      
      if (config.body && !(config.body instanceof FormData)) {
        console.log(`📦 Request Body:`, config.body);
      }

      const response = await fetch(url, config);
      
      // Handle non-JSON responses
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`📨 Response from ${endpoint}:`, data);

      if (!response.ok) {
        console.error(`❌ HTTP Error ${response.status}:`, data);
        
        if (response.status === 401) {
          this.removeToken();
          window.dispatchEvent(new Event('unauthorized'));
        }
        
        let errorMessage = data.detail || data.message || data.error || `HTTP Error ${response.status}`;
        
        // Handle array of errors
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(err => err.msg || JSON.stringify(err)).join(', ');
        }
        
        // Handle string error messages
        if (typeof data === 'string') {
          errorMessage = data;
        }
        
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error(`❌ API Error at ${endpoint}:`, error);
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Cannot connect to server. Please check if backend is running.');
      }
      
      throw error;
    }
  }

  // ============================
  // AUTH ENDPOINTS - FIXED PASSWORD TRUNCATION
  // ============================

  async register(userData) {
    try {
      console.log('🔄 Registration attempt:', { 
        email: userData.email, 
        hasPassword: !!userData.password 
      });

      // ✅ FIX: Safe password handling with validation
      const safeUserData = {
        ...userData,
        password: userData.password ? userData.password.slice(0, 72) : ''
      };

      console.log('🔒 Password safety check:', {
        original_length: userData.password ? userData.password.length : 0,
        truncated_length: safeUserData.password.length,
        truncated: userData.password ? userData.password.length > 72 : false
      });

      const result = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(safeUserData)
      });
      
      if (result.access_token) {
        this.setToken(result.access_token);
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
      }
      
      return result;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  }

  async login(credentials) {
    try {
      console.log('🔄 Login attempt:', { email: credentials.email });

      // ✅ FIX: Safe password handling with validation
      const safeCredentials = {
        ...credentials,
        password: credentials.password ? credentials.password.slice(0, 72) : ''
      };

      console.log('🔒 Password safety check:', {
        original_length: credentials.password ? credentials.password.length : 0,
        truncated_length: safeCredentials.password.length,
        truncated: credentials.password ? credentials.password.length > 72 : false
      });

      const result = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(safeCredentials)
      });
      
      if (result.access_token) {
        this.setToken(result.access_token);
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
      }
      
      return result;
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST'
      });
    } catch (error) {
      console.log('Logout API call failed, continuing with client-side logout');
    } finally {
      this.removeToken();
      window.dispatchEvent(new Event('logout'));
      return { success: true, message: 'Logged out successfully' };
    }
  }

  async forgotPassword(email) {
    try {
      console.log('🔄 Forgot password request for:', email);
      
      const result = await this.request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      
      console.log('✅ Forgot password response:', result);
      return result;
    } catch (error) {
      console.error('❌ Forgot password failed:', error);
      throw error;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      console.log('🔄 Reset password attempt');
      console.log('📦 Reset data:', {
        token_length: token?.length,
        password_length: newPassword?.length,
        token_preview: token ? `${token.substring(0, 10)}...${token.substring(token.length - 5)}` : 'No token'
      });
      
      // ✅ FIX: Safe password handling with validation
      const safeNewPassword = newPassword ? newPassword.slice(0, 72) : '';
      
      const requestData = {
        token: token,
        new_password: safeNewPassword
      };

      console.log('🔒 Password safety check:', {
        original_length: newPassword ? newPassword.length : 0,
        truncated_length: safeNewPassword.length,
        truncated: newPassword ? newPassword.length > 72 : false
      });

      console.log('📤 Sending reset data:', { 
        ...requestData, 
        token: '***', // Hide full token in logs
        new_password: '***' // Hide password in logs
      });

      const result = await this.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
      
      console.log('✅ Reset password response:', result);
      return result;
    } catch (error) {
      console.error('❌ Reset password failed:', error);
      
      if (error.message.includes('Invalid') || error.message.includes('expired') || error.message.includes('400')) {
        throw new Error('Invalid or expired reset token. Please request a new reset link.');
      }
      
      throw error;
    }
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  async checkAuthStatus() {
    if (!this.token) {
      return { authenticated: false, message: 'No token found' };
    }

    try {
      const user = await this.getCurrentUser();
      return { 
        authenticated: true, 
        user: user,
        message: 'User is authenticated'
      };
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      
      if (error.message.includes('401') || error.message.includes('Invalid token')) {
        this.removeToken();
      }
      
      return { 
        authenticated: false, 
        message: 'Token invalid or expired',
        error: error.message
      };
    }
  }

  // ============================
  // PROFILE ENDPOINTS - ALL REMOVED
  // ============================

  // ============================
  // INTERNSHIPS ENDPOINTS
  // ============================

  async getInternships(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/internships?${queryString}` : '/internships';
      return await this.request(endpoint);
    } catch (error) {
      console.log('Internships endpoint failed, generating fallback data');
      return this.generateFallbackInternships();
    }
  }

  async getInternshipById(id) {
    return await this.request(`/internships/${id}`);
  }

  async applyForInternship(internshipId, applicationData) {
    return await this.request(`/internships/${internshipId}/apply`, {
      method: 'POST',
      body: JSON.stringify(applicationData)
    });
  }

  // ============================
  // APPLICATIONS ENDPOINTS
  // ============================

  async getApplications() {
    return await this.request('/applications');
  }

  async getApplicationById(id) {
    return await this.request(`/applications/${id}`);
  }

  async updateApplicationStatus(applicationId, status) {
    return await this.request(`/applications/${applicationId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // ============================
  // ATS CHECKER ENDPOINTS - FIXED FILE UPLOAD
  // ============================

  async analyzeResume(data) {
    try {
      console.log('🔄 ATS Analysis request:', {
        text_length: data.resume_text?.length,
        job_desc_length: data.job_description?.length,
        file_name: data.file_name
      });

      const result = await this.request('/ats/analyze', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      console.log('✅ ATS Analysis result:', result);
      return result;
    } catch (error) {
      console.error('❌ ATS Analysis failed:', error);
      throw error;
    }
  }

  async analyzeResumeFile(file, jobDescription = '', userId = 'demo-user') {
    try {
      console.log('🔄 ATS File Analysis request:', {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        job_desc_length: jobDescription.length
      });

      // Use direct fetch for file uploads to avoid JSON issues
      const url = `${this.baseURL}/ats/analyze-file`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('job_description', jobDescription);
      formData.append('user_id', userId);

      const config = {
        method: 'POST',
        body: formData,
      };

      // Add authorization if token exists
      if (this.token) {
        config.headers = {
          'Authorization': `Bearer ${this.token}`
        };
      }

      const response = await fetch(url, config);
      let data;
      
      try {
        data = await response.json();
      } catch (jsonError) {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.detail || data.message || `HTTP Error ${response.status}`);
      }
      
      console.log('✅ ATS File Analysis result:', data);
      return data;
    } catch (error) {
      console.error('❌ ATS File Analysis failed:', error);
      throw error;
    }
  }

  async improveResume(data) {
    try {
      console.log('🔄 Resume Improvement request:', {
        text_length: data.resume_text?.length,
        job_desc_length: data.job_description?.length
      });

      const result = await this.request('/ats/improve', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      console.log('✅ Resume Improvement result:', result);
      return result;
    } catch (error) {
      console.error('❌ Resume Improvement failed:', error);
      throw error;
    }
  }

  async getATSAnalysisHistory(userId, limit = 10) {
    try {
      console.log('🔄 Fetching ATS analysis history for user:', userId);
      
      const result = await this.request(`/ats/history/${userId}?limit=${limit}`);
      console.log('✅ ATS History result:', result);
      return result;
    } catch (error) {
      console.error('❌ ATS History fetch failed:', error);
      throw error;
    }
  }

  async getATSAnalysis(analysisId) {
    try {
      console.log('🔄 Fetching ATS analysis:', analysisId);
      
      const result = await this.request(`/ats/analysis/${analysisId}`);
      console.log('✅ ATS Analysis fetch result:', result);
      return result;
    } catch (error) {
      console.error('❌ ATS Analysis fetch failed:', error);
      throw error;
    }
  }

  // ============================
  // AI MOCK INTERVIEW ENDPOINTS - ALL REMOVED
  // ============================

  // ============================
  // DASHBOARD ENDPOINTS
  // ============================

  async getDashboardStats() {
    return await this.request('/dashboard/stats');
  }

  async getRecentActivity() {
    return await this.request('/dashboard/activity');
  }

  async getApplicationStats() {
    return await this.request('/dashboard/applications');
  }

  // ============================
  // FALLBACK DATA
  // ============================

  generateFallbackInternships() {
    const internships = [
      {
        id: "1",
        companyName: "Google",
        position: "Frontend Intern",
        location: "Mountain View, CA",
        description: "Build amazing user experiences for Google's products",
        requirements: ["React", "JavaScript", "HTML", "CSS"],
        duration: "3 months",
        stipend: "$6000/month",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        matchPercentage: 92,
        companyLogo: "/images/google-logo.png"
      },
      {
        id: "2", 
        companyName: "Microsoft",
        position: "SWE Intern",
        location: "Redmond, WA",
        description: "Develop software solutions for Microsoft's ecosystem",
        requirements: ["Python", "Java", "C#", "Azure"],
        duration: "4 months",
        stipend: "$5500/month",
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
        matchPercentage: 85,
        companyLogo: "/images/microsoft-logo.png"
      },
      {
        id: "3",
        companyName: "Amazon",
        position: "Backend Intern", 
        location: "Seattle, WA",
        description: "Work on scalable backend systems for AWS",
        requirements: ["Java", "Python", "AWS", "Docker"],
        duration: "3 months",
        stipend: "$5800/month",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        matchPercentage: 78,
        companyLogo: "/images/amazon-logo.png"
      }
    ];

    return {
      success: true,
      data: internships,
      total: internships.length,
      message: "Using fallback data - backend unavailable"
    };
  }

  // ============================
  // UTILITY METHODS
  // ============================

  async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      return { 
        success: false, 
        error: error.message,
        status: 'Backend unavailable'
      };
    }
  }

  isAuthenticated() {
    return !!this.token;
  }

  getStoredUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  async testBackendConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      return {
        success: response.ok,
        status: response.status,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 'Connection failed'
      };
    }
  }

  // Network status monitoring
  async waitForBackend(retries = 10, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await this.testBackendConnection();
        if (result.success) {
          console.log('✅ Backend is ready!');
          return true;
        }
      } catch (error) {
        console.log(`⏳ Waiting for backend... (${i + 1}/${retries})`);
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    throw new Error('Backend not available after retries');
  }

  // File validation utility
  validateFile(file, maxSize = 5 * 1024 * 1024) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!file) {
      return { valid: false, error: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: 'Invalid file type. Please upload PDF, DOC, DOCX, or TXT files only.' 
      };
    }

    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: `File size too large. Maximum size is ${maxSize / 1024 / 1024}MB.` 
      };
    }

    return { valid: true };
  }
}

// Create global instance
const apiService = new ApiService();

// Utility functions
export const apiUtils = {
  validatePassword(password) {
    const issues = [];
    const suggestions = [];
    
    if (!password) {
      issues.push('Password is required');
    } else {
      if (password.length < 8) {
        issues.push('Password must be at least 8 characters long');
        suggestions.push('Make your password longer for better security');
      }
      
      if (!/\d/.test(password)) {
        issues.push('Password must contain at least one number');
      }
      
      if (!/[a-z]/.test(password)) {
        issues.push('Password must contain at least one lowercase letter');
      }
      
      if (!/[A-Z]/.test(password)) {
        issues.push('Password must contain at least one uppercase letter');
        suggestions.push('Mix uppercase and lowercase letters');
      }
      
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        issues.push('Password must contain at least one special character');
        suggestions.push('Add special characters like !@#$% for stronger security');
      }
      
      if (/(.)\1\1/.test(password)) {
        issues.push('Password should not contain repeating characters');
      }
    }
    
    return {
      valid: issues.length === 0,
      issues: issues,
      suggestions: suggestions.length > 0 ? suggestions : [
        'Use a mix of letters, numbers, and special characters',
        'Avoid common words and personal information'
      ]
    };
  },

  validateEmail(email) {
    if (!email) {
      return { valid: false, error: 'Email is required' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    
    // Additional email validation
    if (email.length > 254) {
      return { valid: false, error: 'Email address is too long' };
    }
    
    const [localPart, domain] = email.split('@');
    if (localPart.length > 64) {
      return { valid: false, error: 'Email local part is too long' };
    }
    
    return { valid: true };
  },

  validateToken(token) {
    if (!token) {
      return { valid: false, error: 'Token is required' };
    }
    
    if (token.length < 10) {
      return { valid: false, error: 'Invalid token format' };
    }
    
    return { valid: true };
  },

  generateTestPassword() {
    const adjectives = ['Secure', 'Strong', 'Safe', 'Private', 'Protected'];
    const nouns = ['Password', 'Passcode', 'Key', 'Access', 'Login'];
    const numbers = Math.floor(100 + Math.random() * 900); // 100-999
    const specialChars = ['!', '@', '#', '$', '%', '&'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const specialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    
    return `${adjective}${noun}${numbers}${specialChar}`;
  },

  // Format API errors for display
  formatErrorMessage(error) {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error.message) {
      return error.message;
    }
    
    if (error.detail) {
      if (Array.isArray(error.detail)) {
        return error.detail.map(err => err.msg || JSON.stringify(err)).join(', ');
      }
      return error.detail;
    }
    
    return 'An unexpected error occurred';
  },

  // Safe localStorage operations
  safeStorageGet(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  // Debounce function for API calls
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // ATS-specific utilities
  calculateATSColor(score) {
    if (score >= 80) return '#10b981'; // green
    if (score >= 70) return '#f59e0b'; // yellow
    if (score >= 60) return '#f97316'; // orange
    return '#ef4444'; // red
  },

  getATSRating(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  }
};

// Event listeners for global auth state changes
if (typeof window !== 'undefined') {
  window.addEventListener('unauthorized', () => {
    console.log('🛑 Unauthorized access detected');
    // Redirect to login page or show modal
    if (window.location.pathname !== '/login') {
      window.dispatchEvent(new Event('showLoginModal'));
    }
  });

  window.addEventListener('logout', () => {
    console.log('👋 User logged out');
    // Clear any application-specific data
    localStorage.removeItem('ats_analyses');
    localStorage.removeItem('internship_filters');
    localStorage.removeItem('interview_sessions');
  });

  // Custom event for ATS analysis completion
  window.addEventListener('atsAnalysisComplete', (event) => {
    console.log('✅ ATS Analysis completed:', event.detail);
  });
}

export { apiService };
export default apiService;
