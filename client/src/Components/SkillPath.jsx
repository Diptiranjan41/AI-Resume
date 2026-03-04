import React, { useState, useEffect } from 'react';

const SkillPath = () => {  // Changed component name to match filename
  const [currentStep, setCurrentStep] = useState(1);
  const [jobRole, setJobRole] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [readinessScore, setReadinessScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Available job roles
  const jobRoles = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Data Scientist',
    'Data Analyst',
    'UI/UX Designer',
    'DevOps Engineer',
    'Mobile Developer',
    'Software Engineer',
    'Product Manager'
  ];

  // Skill mapping for case-insensitive matching
  const skillMapping = {
    // Frontend
    'html': 'HTML',
    'css': 'CSS',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'react': 'React',
    'react.js': 'React',
    'vue': 'Vue.js',
    'vuejs': 'Vue.js',
    'angular': 'Angular',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'responsive design': 'Responsive Design',
    'responsive': 'Responsive Design',
    
    // Backend
    'python': 'Python',
    'node': 'Node.js',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'java': 'Java',
    'sql': 'SQL',
    'api': 'API Development',
    'api development': 'API Development',
    'rest api': 'API Development',
    'database': 'Database Design',
    'database design': 'Database Design',
    'system design': 'System Design',
    
    // Data
    'data analysis': 'Data Analysis',
    'data analytics': 'Data Analysis',
    'statistics': 'Statistics',
    'stats': 'Statistics',
    'machine learning': 'Machine Learning',
    'ml': 'Machine Learning',
    'data visualization': 'Data Visualization',
    'data viz': 'Data Visualization',
    'pandas': 'Pandas',
    'data cleaning': 'Data Cleaning',
    'excel': 'Excel',
    'power bi': 'Power BI',
    'powerbi': 'Power BI',
    
    // Design
    'figma': 'Figma',
    'user research': 'User Research',
    'wireframing': 'Wireframing',
    'prototyping': 'Prototyping',
    'design systems': 'Design Systems',
    'usability testing': 'Usability Testing',
    
    // General
    'git': 'Git',
    'github': 'GitHub',
    'ci/cd': 'CI/CD',
    'cicd': 'CI/CD',
    'docker': 'Docker',
    'cloud': 'Cloud Computing',
    'cloud computing': 'Cloud Computing',
    'linux': 'Linux',
    'networking': 'Networking',
    'infrastructure': 'Infrastructure',
    'communication': 'Communication',
    'market research': 'Market Research',
    'product strategy': 'Product Strategy',
    'project management': 'Project Management',
    'data structures': 'Data Structures',
    'algorithms': 'Algorithms',
    'react native': 'React Native',
    'mobile development': 'iOS/Android',
    'ios': 'iOS/Android',
    'android': 'iOS/Android'
  };

  // Skill recommendations database
  const skillRecommendations = {
    // Frontend Skills
    'HTML': ['CSS', 'JavaScript', 'Responsive Design', 'CSS Frameworks'],
    'CSS': ['Sass', 'LESS', 'CSS-in-JS', 'Animation'],
    'JavaScript': ['React', 'TypeScript', 'Vue.js', 'Node.js'],
    'React': ['Redux', 'Next.js', 'Testing', 'State Management'],
    
    // Backend Skills
    'Python': ['Django', 'Flask', 'API Development', 'Database Design'],
    'Node.js': ['Express.js', 'REST APIs', 'Authentication', 'WebSockets'],
    'Java': ['Spring Boot', 'Microservices', 'Hibernate', 'Maven'],
    
    // Data Skills
    'SQL': ['Database Design', 'Query Optimization', 'NoSQL', 'Data Modeling'],
    'Data Analysis': ['Python', 'Pandas', 'Statistics', 'Data Visualization'],
    'Excel': ['Power BI', 'Advanced Formulas', 'Data Cleaning', 'Pivot Tables'],
    
    // Design Skills
    'Figma': ['Prototyping', 'Design Systems', 'User Research', 'Wireframing'],
    
    // General Skills
    'Git': ['GitHub', 'CI/CD', 'Branching Strategies', 'Code Review'],
    'Communication': ['Technical Writing', 'Presentation', 'Documentation', 'Team Collaboration']
  };

  // Learning resources for each skill
  const learningResources = {
    'HTML': 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    'CSS': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    'React': 'https://react.dev/learn',
    'TypeScript': 'https://www.typescriptlang.org/docs/',
    'Vue.js': 'https://vuejs.org/guide/',
    'Angular': 'https://angular.io/docs',
    'Responsive Design': 'https://web.dev/responsive-web-design-basics/',
    'Python': 'https://docs.python.org/3/tutorial/',
    'Node.js': 'https://nodejs.org/en/docs/guides/',
    'Java': 'https://docs.oracle.com/javase/tutorial/',
    'SQL': 'https://www.w3schools.com/sql/',
    'API Development': 'https://restfulapi.net/',
    'Database Design': 'https://www.geeksforgeeks.org/database-design/',
    'System Design': 'https://github.com/donnemartin/system-design-primer',
    'Data Analysis': 'https://www.coursera.org/learn/data-analysis',
    'Statistics': 'https://www.khanacademy.org/math/statistics-probability',
    'Machine Learning': 'https://www.coursera.org/learn/machine-learning',
    'Data Visualization': 'https://www.tableau.com/learn/articles/data-visualization',
    'Pandas': 'https://pandas.pydata.org/docs/',
    'Data Cleaning': 'https://towardsdatascience.com/the-ultimate-guide-to-data-cleaning-3969843991d4',
    'Excel': 'https://support.microsoft.com/en-us/excel',
    'Power BI': 'https://learn.microsoft.com/en-us/power-bi/',
    'Figma': 'https://help.figma.com/hc/en-us',
    'User Research': 'https://www.nngroup.com/articles/user-research/',
    'Wireframing': 'https://www.uxpin.com/studio/blog/wireframing/',
    'Prototyping': 'https://www.interaction-design.org/literature/topics/prototyping',
    'Design Systems': 'https://www.designsystems.com/',
    'Usability Testing': 'https://www.nngroup.com/articles/usability-testing/',
    'Git': 'https://git-scm.com/doc',
    'GitHub': 'https://docs.github.com/en',
    'CI/CD': 'https://www.redhat.com/en/topics/devops/what-is-ci-cd',
    'Docker': 'https://docs.docker.com/get-started/',
    'Cloud Computing': 'https://aws.amazon.com/what-is-cloud-computing/',
    'Linux': 'https://www.linux.org/forums/linux-beginner-tutorials.123/',
    'Networking': 'https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-computer-networking.html',
    'Infrastructure': 'https://www.ibm.com/topics/infrastructure',
    'Communication': 'https://www.coursera.org/learn/communication-skills',
    'Market Research': 'https://www.ama.org/topics/market-research/',
    'Product Strategy': 'https://www.productplan.com/learn/product-strategy/',
    'Project Management': 'https://www.pmi.org/learning/library',
    'Data Structures': 'https://www.geeksforgeeks.org/data-structures/',
    'Algorithms': 'https://www.khanacademy.org/computing/computer-science/algorithms',
    'React Native': 'https://reactnative.dev/docs/getting-started',
    'iOS/Android': 'https://developer.apple.com/ios/',
    'Redux': 'https://redux.js.org/',
    'Next.js': 'https://nextjs.org/docs',
    'Django': 'https://docs.djangoproject.com/',
    'Flask': 'https://flask.palletsprojects.com/',
    'Express.js': 'https://expressjs.com/',
    'Spring Boot': 'https://spring.io/projects/spring-boot',
    'Microservices': 'https://microservices.io/',
    'Sass': 'https://sass-lang.com/guide/',
    'LESS': 'http://lesscss.org/',
    'NoSQL': 'https://www.mongodb.com/nosql-explained',
    'MongoDB': 'https://www.mongodb.com/docs/',
    'AWS': 'https://aws.amazon.com/getting-started/',
    'Azure': 'https://learn.microsoft.com/en-us/azure/',
    'Google Cloud': 'https://cloud.google.com/docs',
    'Kubernetes': 'https://kubernetes.io/docs/home/',
    'TensorFlow': 'https://www.tensorflow.org/learn',
    'PyTorch': 'https://pytorch.org/tutorials/',
    'Scikit-learn': 'https://scikit-learn.org/stable/user_guide.html',
    'Jest': 'https://jestjs.io/docs/getting-started',
    'Cypress': 'https://docs.cypress.io/guides/overview/why-cypress',
    'Webpack': 'https://webpack.js.org/guides/',
    'GraphQL': 'https://graphql.org/learn/',
    'REST': 'https://restfulapi.net/',
    'OAuth': 'https://oauth.net/2/',
    'JWT': 'https://jwt.io/introduction',
    'WebSockets': 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
    'Agile': 'https://www.agilealliance.org/agile101/',
    'Scrum': 'https://www.scrum.org/resources/what-is-scrum',
    'Kanban': 'https://www.atlassian.com/agile/kanban',
    'TDD': 'https://www.guru99.com/test-driven-development.html',
    'BDD': 'https://cucumber.io/docs/bdd/',
    'SEO': 'https://developers.google.com/search/docs',
    'Web Performance': 'https://web.dev/performance/',
    'Accessibility': 'https://web.dev/accessibility/',
    'Security': 'https://owasp.org/www-project-top-ten/',
    'Testing': 'https://jestjs.io/docs/getting-started',
    'State Management': 'https://redux.js.org/understanding/thinking-in-redux/three-principles',
    'Authentication': 'https://auth0.com/docs/get-started/authentication-and-authorization-flow',
    'Authorization': 'https://auth0.com/docs/get-started/identity-fundamentals/authentication-and-authorization',
    'Web Security': 'https://developer.mozilla.org/en-US/docs/Web/Security',
    'Mobile UI': 'https://developer.apple.com/design/human-interface-guidelines/',
    'Performance': 'https://web.dev/learn/#performance'
  };

  // Complete required skills for ALL job roles with weights
  const roleRequirements = {
    'Frontend Developer': [
      { skill: 'HTML', weight: 15 },
      { skill: 'CSS', weight: 15 },
      { skill: 'JavaScript', weight: 20 },
      { skill: 'React', weight: 20 },
      { skill: 'Responsive Design', weight: 10 },
      { skill: 'Git', weight: 10 },
      { skill: 'TypeScript', weight: 10 }
    ],
    'Backend Developer': [
      { skill: 'Python', weight: 20 },
      { skill: 'Node.js', weight: 20 },
      { skill: 'SQL', weight: 15 },
      { skill: 'API Development', weight: 15 },
      { skill: 'Database Design', weight: 15 },
      { skill: 'Git', weight: 10 },
      { skill: 'System Design', weight: 5 }
    ],
    'Full Stack Developer': [
      { skill: 'HTML', weight: 10 },
      { skill: 'CSS', weight: 10 },
      { skill: 'JavaScript', weight: 15 },
      { skill: 'React', weight: 15 },
      { skill: 'Node.js', weight: 15 },
      { skill: 'SQL', weight: 15 },
      { skill: 'Git', weight: 10 },
      { skill: 'API Development', weight: 10 }
    ],
    'Data Scientist': [
      { skill: 'Python', weight: 25 },
      { skill: 'SQL', weight: 15 },
      { skill: 'Statistics', weight: 15 },
      { skill: 'Machine Learning', weight: 20 },
      { skill: 'Data Visualization', weight: 10 },
      { skill: 'Pandas', weight: 10 },
      { skill: 'Data Cleaning', weight: 5 }
    ],
    'Data Analyst': [
      { skill: 'SQL', weight: 20 },
      { skill: 'Excel', weight: 15 },
      { skill: 'Data Visualization', weight: 15 },
      { skill: 'Statistics', weight: 15 },
      { skill: 'Data Cleaning', weight: 10 },
      { skill: 'Python', weight: 15 },
      { skill: 'Power BI', weight: 10 }
    ],
    'UI/UX Designer': [
      { skill: 'Figma', weight: 25 },
      { skill: 'User Research', weight: 20 },
      { skill: 'Wireframing', weight: 15 },
      { skill: 'Prototyping', weight: 15 },
      { skill: 'Design Systems', weight: 15 },
      { skill: 'Usability Testing', weight: 10 }
    ],
    'DevOps Engineer': [
      { skill: 'Git', weight: 15 },
      { skill: 'Docker', weight: 20 },
      { skill: 'CI/CD', weight: 20 },
      { skill: 'Cloud Computing', weight: 15 },
      { skill: 'Linux', weight: 15 },
      { skill: 'Networking', weight: 10 },
      { skill: 'Infrastructure', weight: 5 }
    ],
    'Mobile Developer': [
      { skill: 'JavaScript', weight: 20 },
      { skill: 'React Native', weight: 25 },
      { skill: 'iOS/Android', weight: 20 },
      { skill: 'API Integration', weight: 15 },
      { skill: 'Mobile UI', weight: 10 },
      { skill: 'Performance', weight: 10 }
    ],
    'Software Engineer': [
      { skill: 'Python', weight: 20 },
      { skill: 'Java', weight: 15 },
      { skill: 'SQL', weight: 15 },
      { skill: 'Data Structures', weight: 15 },
      { skill: 'Algorithms', weight: 15 },
      { skill: 'Git', weight: 10 },
      { skill: 'System Design', weight: 10 }
    ],
    'Product Manager': [
      { skill: 'Communication', weight: 25 },
      { skill: 'Market Research', weight: 20 },
      { skill: 'Product Strategy', weight: 20 },
      { skill: 'Data Analysis', weight: 15 },
      { skill: 'Project Management', weight: 20 }
    ]
  };

  const [recommendedSkills, setRecommendedSkills] = useState([]);

  // Normalize skill name to match our standard format
  const normalizeSkill = (skill) => {
    const lowerSkill = skill.toLowerCase().trim();
    return skillMapping[lowerSkill] || skill;
  };

  // Handle job role selection
  const handleJobRoleSelect = (role) => {
    setJobRole(role);
    setCurrentStep(2);
  };

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const normalizedSkill = normalizeSkill(newSkill);
      if (!userSkills.includes(normalizedSkill)) {
        const updatedSkills = [...userSkills, normalizedSkill];
        setUserSkills(updatedSkills);
        setNewSkill('');
      }
    }
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  // Get learning resource URL for a skill
  const getLearningResource = (skill) => {
    return learningResources[skill] || `https://www.google.com/search?q=learn+${encodeURIComponent(skill)}`;
  };

  // Simulate AI analysis with progress
  useEffect(() => {
    if (isAnalyzing) {
      const timer = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            generateResults();
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return () => clearInterval(timer);
    }
  }, [isAnalyzing]);

  // Generate recommendations and calculate readiness score
  const generateResults = () => {
    console.log('Generating results for:', jobRole);
    console.log('User skills (normalized):', userSkills);
    
    // Generate recommendations based on current skills
    const recommendations = new Set();
    
    userSkills.forEach(skill => {
      if (skillRecommendations[skill]) {
        skillRecommendations[skill].forEach(rec => {
          if (!userSkills.includes(rec)) {
            recommendations.add(rec);
          }
        });
      }
    });

    // Add role-specific requirements as recommendations
    const roleSpecificSkills = roleRequirements[jobRole]?.map(req => req.skill) || [];
    console.log('Role specific skills:', roleSpecificSkills);
    
    roleSpecificSkills.forEach(skill => {
      if (!userSkills.includes(skill)) {
        recommendations.add(skill);
      }
    });

    // Convert to array and take top 10
    const topRecommendations = Array.from(recommendations).slice(0, 10);
    setRecommendedSkills(topRecommendations);

    // Calculate weighted readiness score
    const requirements = roleRequirements[jobRole] || [];
    console.log('Requirements:', requirements);
    
    let totalWeight = 0;
    let achievedWeight = 0;

    requirements.forEach(req => {
      totalWeight += req.weight;
      if (userSkills.includes(req.skill)) {
        achievedWeight += req.weight;
        console.log(`✅ Matched skill: ${req.skill} - Weight: ${req.weight}`);
      } else {
        console.log(`❌ Missing skill: ${req.skill} - Weight: ${req.weight}`);
      }
    });

    console.log('Total Weight:', totalWeight);
    console.log('Achieved Weight:', achievedWeight);

    const score = totalWeight > 0 ? Math.round((achievedWeight / totalWeight) * 100) : 0;
    console.log('Calculated Score:', score);
    
    setReadinessScore(score);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentStep(3);
  };

  // Start analysis
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
  };

  // Reset the process
  const handleReset = () => {
    setCurrentStep(1);
    setJobRole('');
    setUserSkills([]);
    setRecommendedSkills([]);
    setReadinessScore(0);
  };

  // Circular Progress Component
  const CircularProgress = ({ score, size = 200, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-500';
      if (score >= 60) return 'text-blue-500';
      if (score >= 40) return 'text-yellow-500';
      return 'text-red-500';
    };

    const getStrokeColor = (score) => {
      if (score >= 80) return 'stroke-green-500';
      if (score >= 60) return 'stroke-blue-500';
      if (score >= 40) return 'stroke-yellow-500';
      return 'stroke-red-500';
    };

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(229, 231, 235)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${getStrokeColor(score)}`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <div className="text-sm text-gray-500 mt-1">Readiness</div>
        </div>
      </div>
    );
  };

  // Analysis Progress Component
  const AnalysisProgress = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">AI Analysis in Progress</h3>
          <p className="text-gray-600 mb-4">Analyzing your skills against {jobRole} requirements...</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${analysisProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{analysisProgress}% Complete</p>
        </div>
      </div>
    </div>
  );

  // Get skill suggestions based on job role
  const getSkillSuggestions = () => {
    if (!jobRole) return [];
    const requirements = roleRequirements[jobRole] || [];
    return requirements.map(req => req.skill).slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-4 md:p-8 font-sans">
      {isAnalyzing && <AnalysisProgress />}
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            🚀 AI Career Navigator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Smart skill progression path for your dream career
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Job Role Selection */}
        {currentStep === 1 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
                Choose Your Target Job Role
              </h2>
              <p className="text-gray-600 text-lg">
                Select the career path you want to pursue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleJobRoleSelect(role)}
                  className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-blue-200 
                           hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-lg">
                      {role}
                    </h3>
                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {roleRequirements[role]?.length || 0} key skills required
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Current Skills Upload */}
        {currentStep === 2 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  Add Your Current Skills
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                  Target Role: <span className="font-semibold text-blue-600">{jobRole}</span>
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">2</span>
              </div>
            </div>

            {/* Skill Suggestions */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Suggested skills for {jobRole}:</p>
              <div className="flex flex-wrap gap-2">
                {getSkillSuggestions().map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!userSkills.includes(skill)) {
                        setUserSkills([...userSkills, skill]);
                      }
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-4 mb-8">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder={`Enter skills for ${jobRole} (e.g., ${getSkillSuggestions().join(', ')})`}
                className="flex-1 px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 text-lg"
              >
                Add Skill
              </button>
            </div>

            {/* Current Skills Display */}
            {userSkills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Current Skills ({userSkills.length}):</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="relative p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">💼</span>
                          <span className="font-semibold text-lg">{skill}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-lg"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-8 py-3 border border-gray-300 text-gray-600 rounded-2xl hover:bg-gray-50 transition-colors text-lg font-semibold"
              >
                ← Back to Roles
              </button>
              
              <button
                onClick={startAnalysis}
                disabled={userSkills.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Analyze My Readiness →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results Dashboard */}
        {currentStep === 3 && (
          <div className="space-y-8">
            {/* Readiness Score Card with Circular Progress */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
                    Career Readiness Analysis
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Based on your current skills for <span className="font-semibold text-blue-600">{jobRole}</span> role
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{userSkills.length}</div>
                      <div className="text-gray-600">Skills You Have</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-2xl border border-cyan-200">
                      <div className="text-2xl font-bold text-cyan-600">{recommendedSkills.length}</div>
                      <div className="text-gray-600">Skills to Learn</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600 font-medium">
                        AI analyzed {roleRequirements[jobRole]?.length || 0} required skills for {jobRole}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 flex justify-center">
                  <CircularProgress score={readinessScore} size={220} strokeWidth={15} />
                </div>
              </div>
            </div>

            {/* Current Skills Panel */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  Your Current Skills
                </h2>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="relative p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">✅</span>
                      <span className="font-semibold text-lg">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Skills Panel */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/60">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  Top Recommended Next Skills
                </h2>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">🚀</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-200 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {skill}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Master this skill to advance your {jobRole} career path
                    </p>

                    <a
                      href={getLearningResource(skill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-center"
                    >
                      Start Learning Now →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-lg"
              >
                Start Over with New Role
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillPath; // Changed from SkillPathProgression to SkillPath