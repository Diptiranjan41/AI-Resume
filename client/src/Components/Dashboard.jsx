// Dashboard.jsx - Profile and AI Mock Interview related code removed + Back to Home button
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [skillProgressData, setSkillProgressData] = useState([]);
  const [internshipMatchesData, setInternshipMatchesData] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [careerProgress, setCareerProgress] = useState({});
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Check authentication first
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('auth_token');
      console.log('🔑 Token from localStorage:', token ? 'Present' : 'Not found');
      
      if (!token) {
        console.log('❌ No token found, redirecting to login...');
        navigate('/login');
        return;
      }
      
      await fetchUserData();
    };
    
    checkAuthAndFetchData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get user data from auth/me endpoint instead of profile
      const [userResponse, statsResponse, skillsResponse, matchesResponse, applicationsResponse] = await Promise.all([
        apiService.getCurrentUser(), // Using auth/me endpoint
        apiService.getUserStats ? apiService.getUserStats() : Promise.resolve({ success: false }),
        apiService.getUserSkills ? apiService.getUserSkills() : Promise.resolve({ success: false }),
        apiService.getInternshipMatches ? apiService.getInternshipMatches() : Promise.resolve({ success: false }),
        apiService.getApplications ? apiService.getApplications() : Promise.resolve({ success: false, data: [] })
      ]);

      console.log('📊 User Response:', userResponse);

      // Set user data
      if (userResponse && userResponse.success && userResponse.user) {
        const userData = userResponse.user;
        setUser(userData);
        
        // Calculate career progress
        const progress = calculateCareerProgress(userData, applicationsResponse.data || []);
        setCareerProgress(progress);
        
        // Set stats
        const calculatedStats = calculateUserStats(userData);
        setUserStats(calculatedStats);
      } else {
        console.log('❌ Failed to fetch user:', userResponse);
      }

      // Set skills from response or user data
      if (skillsResponse.success && skillsResponse.data) {
        console.log('🎯 Raw skills data:', skillsResponse.data);
        
        const skillsWithProgress = skillsResponse.data.map(skill => {
          const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill || '';
          return {
            skill: skillName,
            progress: skill.proficiency || calculateSkillProficiency(skillName, user),
            target: skill.targetProficiency || 80,
            category: skill.category || categorizeSkill(skillName),
            lastUpdated: skill.lastUpdated || new Date().toISOString()
          };
        });
        
        setSkillProgressData(skillsWithProgress);
      } else if (user?.skills && user.skills.length > 0) {
        const skillsFromProfile = user.skills.map(skill => {
          const skillName = typeof skill === 'string' ? skill : skill.name || skill;
          return {
            skill: skillName,
            progress: calculateSkillProficiency(skillName, user),
            target: 80,
            category: categorizeSkill(skillName),
            lastUpdated: new Date().toISOString()
          };
        });
        setSkillProgressData(skillsFromProfile);
      }

      // Set internship matches
      if (matchesResponse.success && matchesResponse.data) {
        const matches = matchesResponse.data.map((internship, index) => ({
          company: internship.companyName || internship.company || 'Company',
          match: internship.matchPercentage || calculateMatchPercentage(user, internship),
          status: getMatchStatus(internship.matchPercentage || calculateMatchPercentage(user, internship)),
          position: internship.position || 'Position',
          location: internship.location || '',
          skillsMatch: internship.skillsMatch || [],
          id: internship.id || `internship-${index}`
        }));
        setInternshipMatchesData(matches);
      } else {
        // Generate mock data for demo
        setInternshipMatchesData(generateMockInternships());
      }

      // Set applications
      if (applicationsResponse.success && applicationsResponse.data) {
        setApplications(applicationsResponse.data);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock internships for demo
  const generateMockInternships = () => {
    return [
      {
        company: 'Google',
        position: 'Frontend Developer Intern',
        match: 92,
        status: 'High',
        location: 'Mountain View, CA',
        skillsMatch: ['React', 'JavaScript', 'HTML/CSS'],
        id: '1'
      },
      {
        company: 'Microsoft',
        position: 'Software Engineer Intern',
        match: 85,
        status: 'High',
        location: 'Redmond, WA',
        skillsMatch: ['Python', 'Java', 'Azure'],
        id: '2'
      },
      {
        company: 'Amazon',
        position: 'Backend Developer Intern',
        match: 78,
        status: 'Medium',
        location: 'Seattle, WA',
        skillsMatch: ['Java', 'AWS', 'Docker'],
        id: '3'
      },
      {
        company: 'Meta',
        position: 'Full Stack Intern',
        match: 71,
        status: 'Medium',
        location: 'Menlo Park, CA',
        skillsMatch: ['React', 'Node.js', 'GraphQL'],
        id: '4'
      }
    ];
  };

  // Calculate user stats from user data
  const calculateUserStats = (userData) => {
    if (!userData) return {
      profileCompletion: 0,
      applications: 0,
      interviews: 0,
      offers: 0,
      resumeScore: 0,
      skillMatchRate: 0
    };

    const applications = userData.applications?.length || 0;
    const interviews = userData.interviews?.length || Math.floor(applications * 0.3);
    const offers = userData.offers?.length || Math.floor(interviews * 0.2);
    
    let profileCompletion = calculateProfileCompletion(userData);
    
    // Calculate resume score
    let resumeScore = 0;
    if (userData.resume) resumeScore += 40;
    if (userData.skills?.length > 0) resumeScore += 30;
    if (userData.profile_photo) resumeScore += 30;

    // Calculate skill match rate
    let skillMatchRate = 0;
    if (userData.skills && userData.skills.length > 0) {
      const highDemandSkills = ['javascript', 'python', 'react', 'node.js', 'java', 'aws', 'html', 'css', 'sql'];
      const userSkills = userData.skills.map(skill => 
        (typeof skill === 'string' ? skill : skill.name || skill).toLowerCase()
      );
      
      const matchingSkills = userSkills.filter(skill => 
        highDemandSkills.some(demandSkill => skill.includes(demandSkill))
      );
      
      skillMatchRate = Math.min(Math.round((matchingSkills.length / highDemandSkills.length) * 100), 100);
    }

    return {
      profileCompletion: Math.min(profileCompletion, 100),
      applications: applications,
      interviews: interviews,
      offers: offers,
      resumeScore: Math.min(resumeScore, 100),
      skillMatchRate: skillMatchRate
    };
  };

  // Calculate career progress
  const calculateCareerProgress = (userData, applicationsData = []) => {
    const applications = applicationsData.length || userData?.applications?.length || 0;
    const interviews = userData?.interviews?.length || Math.floor(applications * 0.3);
    const offers = userData?.offers?.length || Math.floor(interviews * 0.2);
    
    return {
      applications,
      interviews,
      offers,
      profileCompletion: calculateProfileCompletion(userData),
      resumeScore: calculateResumeScore(userData),
      skillMatchRate: calculateSkillMatchRate(userData)
    };
  };

  // Calculate profile completion
  const calculateProfileCompletion = (userData) => {
    if (!userData) return 0;

    let completion = 0;
    const fields = {
      firstName: 15,
      lastName: 15,
      email: 15,
      phone: 5,
      bio: 10,
      college: 10,
      degree: 10,
      graduationYear: 5,
      skills: 10,
      profilePhoto: 5,
      resume: 10
    };

    Object.keys(fields).forEach(field => {
      if (field === 'skills' && userData[field] && userData[field].length > 0) {
        completion += fields[field];
      } else if (field === 'resume' && userData[field]) {
        completion += fields[field];
      } else if (userData[field] && userData[field].toString().trim() !== '') {
        completion += fields[field];
      }
    });

    return Math.min(completion, 100);
  };

  // Calculate resume score
  const calculateResumeScore = (userData) => {
    if (!userData) return 0;
    
    let score = 0;
    if (userData.resume) score += 40;
    if (userData.skills?.length > 0) score += 30;
    if (userData.experience?.length > 0) score += 15;
    if (userData.projects?.length > 0) score += 15;
    
    return Math.min(score, 100);
  };

  // Calculate skill proficiency
  const calculateSkillProficiency = (skillName, userData) => {
    if (!userData) return Math.floor(Math.random() * 50) + 50;
    
    let proficiency = 60;
    
    if (userData.experience) {
      proficiency += Math.min(userData.experience * 5, 20);
    }
    
    const advancedSkills = ['react', 'node.js', 'python', 'aws', 'docker', 'typescript', 'next.js'];
    const skillLower = (skillName || '').toLowerCase();
    
    if (advancedSkills.some(s => skillLower.includes(s))) {
      proficiency += 10;
    }
    
    return Math.min(proficiency, 95);
  };

  // Categorize skills
  const categorizeSkill = (skill) => {
    const skillName = (skill || '').toLowerCase();
    const techSkills = ['react', 'javascript', 'python', 'java', 'node', 'html', 'css', 'sql', 'mongodb', 'typescript', 'angular', 'vue'];
    const softSkills = ['communication', 'leadership', 'teamwork', 'problem-solving', 'creativity', 'presentation', 'management'];
    const toolSkills = ['git', 'docker', 'aws', 'figma', 'photoshop', 'vscode', 'jenkins', 'kubernetes'];

    if (techSkills.some(tech => skillName.includes(tech))) return 'Technical';
    if (softSkills.some(soft => skillName.includes(soft))) return 'Soft Skills';
    if (toolSkills.some(tool => skillName.includes(tool))) return 'Tools';
    return 'Other';
  };

  // Calculate skill match rate
  const calculateSkillMatchRate = (userData) => {
    if (!userData?.skills || userData.skills.length === 0) return 0;
    
    const highDemandSkills = ['javascript', 'python', 'react', 'node.js', 'java', 'aws', 'html', 'css'];
    const userSkills = userData.skills.map(skill => 
      (typeof skill === 'string' ? skill : skill.name || skill).toLowerCase()
    );
    
    const matchingSkills = userSkills.filter(skill => 
      highDemandSkills.some(demandSkill => skill.includes(demandSkill))
    );
    
    return Math.min(Math.round((matchingSkills.length / highDemandSkills.length) * 100), 100);
  };

  // Calculate match percentage
  const calculateMatchPercentage = (userData, internship) => {
    if (!userData) return Math.floor(Math.random() * 30) + 60;
    
    let matchScore = 60;
    const userSkills = (userData.skills || []).map(s => 
      (typeof s === 'string' ? s : s.name || s).toLowerCase()
    );
    const requiredSkills = (internship.requiredSkills || internship.skillsMatch || []).map(s => s.toLowerCase());
    
    if (requiredSkills.length > 0) {
      const matchingSkills = userSkills.filter(skill => 
        requiredSkills.some(req => skill.includes(req) || req.includes(skill))
      );
      matchScore += (matchingSkills.length / requiredSkills.length) * 30;
    }
    
    return Math.min(Math.round(matchScore), 98);
  };

  // Get match status
  const getMatchStatus = (percentage) => {
    if (percentage >= 80) return 'High';
    if (percentage >= 60) return 'Medium';
    return 'Low';
  };

  // Profile button handler - UPDATED to use auth/me page instead of profile
  const handleProfileClick = () => {
    console.log('👤 Navigating to profile page...');
    // Using auth/me endpoint page if exists, otherwise show coming soon
    navigate('/auth/me'); // or wherever your user profile page is
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    fetchUserData();
  };

  // Quick action handlers - REMOVED AI Interview
  const handleQuickAction = (action) => {
    switch(action) {
      case 'resume-builder':
        navigate('/resume-builder');
        break;
      case 'career-roadmap':
        navigate('/career-roadmap');
        break;
      case 'skill-gap-analyzer':
        navigate('/skill-gap-analyzer');
        break;
      default:
        break;
    }
  };

  // Go back to home page
  const handleBackToHome = () => {
    navigate('/');
  };

  // Stats data - REMOVED AI Mock Interview button from stats
  const stats = [
    { 
      title: 'Profile Completion', 
      value: `${userStats.profileCompletion || 0}%`, 
      color: 'from-emerald-400 to-cyan-500', 
      icon: '📊',
      progress: userStats.profileCompletion || 0,
      description: 'Complete your profile for better matches'
    },
    { 
      title: 'Applications', 
      value: userStats.applications?.toString() || '0', 
      color: 'from-blue-400 to-indigo-500', 
      icon: '📝',
      progress: Math.min((userStats.applications || 0) * 10, 100),
      description: 'Total internships applied'
    },
    { 
      title: 'Interviews', 
      value: userStats.interviews?.toString() || '0', 
      color: 'from-violet-400 to-purple-500', 
      icon: '🎯',
      progress: Math.min((userStats.interviews || 0) * 20, 100),
      description: 'Upcoming and completed interviews'
    },
    { 
      title: 'Offers', 
      value: userStats.offers?.toString() || '0', 
      color: 'from-indigo-400 to-blue-500', 
      icon: '🏆',
      progress: Math.min((userStats.offers || 0) * 50, 100),
      description: 'Job offers received'
    },
  ];

  // Advanced Features Data - REMOVED AI Mock Interview
  const advancedFeatures = [
    {
      title: 'AI Resume Builder',
      description: 'Smart resume creation with ATS optimization',
      icon: '📝',
      path: '/resume-builder',
      color: 'from-sky-400 to-blue-500',
      action: 'resume-builder'
    },
    {
      title: 'Career Roadmap Generator',
      description: 'Personalized career path with milestones',
      icon: '🗺️',
      path: '/career-roadmap',
      color: 'from-emerald-400 to-green-500',
      action: 'career-roadmap'
    },
    {
      title: 'Skill Gap Analyzer',
      description: 'Identify and bridge skill gaps',
      icon: '🔍',
      path: '/skill-gap-analyzer',
      color: 'from-orange-400 to-red-500',
      action: 'skill-gap-analyzer'
    }
  ];

  // Recent Applications
  const recentApplications = applications.slice(0, 3).map(app => ({
    company: app.company || app.companyName || 'Company',
    position: app.position || 'Position',
    status: app.status || 'applied',
    date: app.appliedDate || app.date || new Date().toLocaleDateString(),
    match: app.matchPercentage || 0
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              {/* Back to Home Button - नया बटन */}
              <button
                onClick={handleBackToHome}
                className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-300/50 hover:border-blue-400/50 px-3 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg hover:bg-white/90 flex items-center gap-2"
                title="Back to Home"
              >
                <span>🏠</span>
                <span className="hidden sm:inline">Home</span>
              </button>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">
                Welcome back{user?.firstName ? `, ${user.firstName}` : user?.name ? `, ${user.name}` : ''}! 👋
              </h1>
              <button
                onClick={handleRefresh}
                className="text-slate-600 hover:text-slate-800 transition-colors duration-200"
                title="Refresh dashboard data"
              >
                🔄
              </button>
            </div>
            <p className="text-slate-600 text-sm sm:text-base">
              {userStats.resumeScore ? 
                `Your resume score: ${userStats.resumeScore}% - ${userStats.resumeScore >= 80 ? 'Excellent!' : userStats.resumeScore >= 60 ? 'Good job!' : 'Keep improving!'}` :
                'Here\'s your career progress overview and personalized recommendations.'
              }
            </p>
          </div>
          <div className="flex gap-3">
            {/* Profile button with icon only */}
            <button
              onClick={handleProfileClick}
              className="bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-300/50 hover:border-slate-400/50 px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-white/90"
              title="View Profile"
            >
              👤
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 sm:p-6 border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                </div>
                <div className="text-2xl sm:text-3xl">{stat.icon}</div>
              </div>
              <div className="mt-3 w-full bg-slate-200/50 rounded-full h-2 backdrop-blur-sm">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Features Section - REMOVED AI Mock Interview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Advanced Features 🚀</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => handleQuickAction(feature.action)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white text-xl mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Skills & Progress */}
          <div className="xl:col-span-2 space-y-6 lg:space-y-8">
            {/* Skill Progress Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Skill Progress Tracker</h2>
                <div className="flex gap-2">
                  <span className="text-sm text-slate-600">{skillProgressData.length} skills</span>
                  <Link to="/skill-path" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                    View All →
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                {skillProgressData.length > 0 ? (
                  skillProgressData.slice(0, 5).map((skill, index) => (
                    <div key={index} className="space-y-2 group">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-700 text-sm sm:text-base">
                          {skill.skill}
                        </span>
                        <span className="text-slate-600 text-sm">
                          {skill.progress}% / {skill.target}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/50 rounded-full h-2 sm:h-3 backdrop-blur-sm">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 sm:h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p className="text-lg mb-2">No skills added yet</p>
                    <p className="text-sm mb-4">Add skills to your profile to track your progress</p>
                    <button
                      onClick={handleProfileClick}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      Add Skills to Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Career Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Career Journey</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 font-medium">Overall Progress</span>
                    <span className="font-semibold text-blue-600">{careerProgress.profileCompletion || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-200/50 rounded-full h-4 backdrop-blur-sm">
                    <div 
                      className="bg-gradient-to-r from-indigo-400 to-blue-500 h-4 rounded-full transition-all duration-1000" 
                      style={{ width: `${careerProgress.profileCompletion || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-200/30">
                    <div className="text-2xl font-bold text-blue-600">{careerProgress.applications || 0}</div>
                    <div className="text-sm text-slate-600 mt-1">Applied</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50/50 backdrop-blur-sm rounded-xl border border-emerald-200/30">
                    <div className="text-2xl font-bold text-emerald-600">{careerProgress.interviews || 0}</div>
                    <div className="text-sm text-slate-600 mt-1">Interviews</div>
                  </div>
                  <div className="text-center p-4 bg-violet-50/50 backdrop-blur-sm rounded-xl border border-violet-200/30">
                    <div className="text-2xl font-bold text-violet-600">{careerProgress.offers || 0}</div>
                    <div className="text-sm text-slate-600 mt-1">Offers</div>
                  </div>
                </div>

                {/* Recent Applications */}
                {recentApplications.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Applications</h3>
                    <div className="space-y-3">
                      {recentApplications.map((app, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-slate-200/50">
                          <div>
                            <p className="font-medium text-slate-800">{app.company}</p>
                            <p className="text-sm text-slate-600">{app.position}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              app.status === 'applied' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'interview' ? 'bg-yellow-100 text-yellow-800' :
                              app.status === 'offer' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {app.status}
                            </span>
                            <p className="text-xs text-slate-500 mt-1">{app.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Internships & Quick Actions */}
          <div className="space-y-6 lg:space-y-8">
            {/* Internship Matches */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Top Internship Matches</h2>
                <Link to="/internships" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {internshipMatchesData.length > 0 ? (
                  internshipMatchesData.slice(0, 4).map((internship, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-4 border border-slate-200/50 rounded-xl hover:border-blue-300/50 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:shadow-md group cursor-pointer"
                      onClick={() => navigate(`/internships/${internship.id}`)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                          {internship.company}
                        </h3>
                        <p className="text-xs text-slate-600">{internship.position}</p>
                        <p className={`text-xs mt-1 ${
                          internship.status === 'High' ? 'text-emerald-600' : 
                          internship.status === 'Medium' ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {internship.status} Match • {internship.skillsMatch?.length || 0} skills match
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-bold text-blue-600">
                          {internship.match}%
                        </p>
                        <p className="text-xs text-slate-600">Match Score</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>No internship matches found.</p>
                    <p className="text-sm mt-1">Complete your profile for better matches.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-white/50 hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/career-navigator" className="bg-white/50 backdrop-blur-sm hover:bg-white/70 p-4 rounded-xl border border-slate-200/50 hover:border-blue-200/50 text-center transition-all duration-200 hover:shadow-md group">
                  <div className="text-blue-500 text-lg mb-2 group-hover:scale-110 transition-transform">🧭</div>
                  <div className="text-sm font-medium text-slate-800">Career Navigator</div>
                </Link>
                <Link to="/ats-checker" className="bg-white/50 backdrop-blur-sm hover:bg-white/70 p-4 rounded-xl border border-slate-200/50 hover:border-emerald-200/50 text-center transition-all duration-200 hover:shadow-md group">
                  <div className="text-emerald-500 text-lg mb-2 group-hover:scale-110">📄</div>
                  <div className="text-sm font-medium text-slate-800">ATS Checker</div>
                </Link>
                <Link to="/skill-path" className="bg-white/50 backdrop-blur-sm hover:bg-white/70 p-4 rounded-xl border border-slate-200/50 hover:border-violet-200/50 text-center transition-all duration-200 hover:shadow-md group">
                  <div className="text-violet-500 text-lg mb-2 group-hover:scale-110">🛠️</div>
                  <div className="text-sm font-medium text-slate-800">Skill Path</div>
                </Link>
                <Link to="/career-roadmap" className="bg-white/50 backdrop-blur-sm hover:bg-white/70 p-4 rounded-xl border border-slate-200/50 hover:border-orange-200/50 text-center transition-all duration-200 hover:shadow-md group">
                  <div className="text-orange-500 text-lg mb-2 group-hover:scale-110">🗺️</div>
                  <div className="text-sm font-medium text-slate-800">Roadmap</div>
                </Link>
              </div>
            </div>

            {/* Profile Completion Tips */}
            {userStats.profileCompletion < 80 && (
              <div className="bg-amber-50/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-amber-200/50">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Complete Your Profile 🎯</h3>
                <p className="text-amber-700 text-sm mb-3">
                  Complete your profile to get better internship matches.
                </p>
                <div className="space-y-2">
                  {!user?.resume && (
                    <p className="text-amber-600 text-xs">• Upload your resume</p>
                  )}
                  {(!user?.skills || user.skills.length === 0) && (
                    <p className="text-amber-600 text-xs">• Add your skills</p>
                  )}
                  {!user?.bio && (
                    <p className="text-amber-600 text-xs">• Write a bio</p>
                  )}
                  {!user?.profile_photo && (
                    <p className="text-amber-600 text-xs">• Add profile photo</p>
                  )}
                </div>
                <button
                  onClick={handleProfileClick}
                  className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Complete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;