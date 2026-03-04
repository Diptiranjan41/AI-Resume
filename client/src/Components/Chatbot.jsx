import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
    Send, Bot, User, Briefcase, Calendar, GraduationCap, Building, 
    BookOpen, Target, Loader2, ShieldCheck, Star, CreditCard, 
    Volume2, MoreVertical, MapPin, Mic, MicOff, Download,
    FileText, Video, MessageCircle, ThumbsUp, ThumbsDown,
    Clock, Search, Filter, Share, Bookmark, Eye, EyeOff
} from 'lucide-react';
import i18n from "i18next";
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// --- I18N CONFIGURATION ---
const resources = {
  en: {
    translation: {
      // General
      "searching": "Searching...",
      "careerNavigatorIsTyping": "Career Navigator is typing",
      "typeYourMessage": "Type your message...",
      "speakNow": "Speak now...",
      "listening": "Listening...",
      "clickToSpeak": "Click to speak",
      "stopSpeaking": "Stop speaking",
      
      // Career Assessment Form
      "careerAssessmentTitle": "Career Assessment",
      "skillsPlaceholder": "Your skills (e.g., Python, Marketing, Design)",
      "interestsPlaceholder": "Your interests",
      "experienceLevelPlaceholder": "Experience level",
      "startAssessment": "Start Assessment",
      "assessmentSuccessMessage": "Your {{type}} assessment has been completed! Career paths generated.",
      "career": "career",
      "skills": "skills",
      "unknownField": "Not specified",
      
      // Internship Matching
      "internshipMatchingTitle": "Internship Matching",
      "desiredRolePlaceholder": "Desired role/internship",
      "locationPreferencePlaceholder": "Location preference",
      "searchInternships": "Find Internships",
      "internshipSuccessMessage": "Found matching internships for {{role}} in {{location}}!",
      
      // Dashboard
      "dashboardTitle": "Your Career Dashboard",
      "myApplications": "My Applications",
      "careerPreferences": "Career Preferences",
      "account": "Account",
      "viewDetails": "View Details",
      "careerGoals": "Career Goals",
      "prefIndustry": "🎯 Target Industry: Technology",
      "prefRole": "💼 Desired Role: Software Engineer",
      "prefLocation": "📍 Preferred Location: Remote",
      "prefSalary": "💰 Expected Salary: $60k-$80k",
      "learningResources": "Learning Resources",
      "recommendedCourses": "📚 Recommended courses: AI/ML, Web Dev",
      "skillGaps": "🔍 Skill gaps to address: Cloud Computing",
      "accountInfo": "Account Information",
      "name": "Name",
      "email": "Email",
      "memberSince": "Member since",
      "subscription": "Subscription",
      "premiumMembership": "Premium Career Plan",
      
      // AI Career Planner
      "aiPlannerTitle": "AI Career Path Planner",
      "aiPlannerPrompt": "Tell me your skills, interests, education background, and career goals for personalized career recommendations!",
      "aiPlannerGoalsPlaceholder": "What are your career goals? (e.g., become data scientist, startup founder)",
      "generateCareerPath": "Generate Career Path",
      
      // Chat Input & Quick Actions
      "resumeTips": "Resume Tips",
      "interviewPrep": "Interview Preparation",
      "uploadResume": "Upload Resume",
      "speakMessage": "Speak Message",
      
      // Feedback
      "feedbackHelpful": "Was this helpful?",
      "yes": "Yes",
      "no": "No",
      "thanksFeedback": "Thanks for your feedback!",
      
      // Advanced Features
      "conversationHistory": "Conversation History",
      "savedResponses": "Saved Responses",
      "exportChat": "Export Chat",
      "clearChat": "Clear Chat",
      "searchChat": "Search in chat",
      "darkMode": "Dark Mode",
      "lightMode": "Light Mode",
      
      // Bot Initial & Common Responses
      "botWelcome": "🎯 Welcome! I'm your AI Career Navigator. I'll help you discover career paths, find internships, and plan your professional growth! 🚀",
      "aboutUs": `Welcome to Career Navigator - Your AI-Powered Career Companion! 🎓\n\n• Personalized career recommendations\n• AI-driven internship matching\n• Skill assessment & gap analysis\n• Learning resource recommendations\n• 24/7 career guidance\n\nStart your career journey with us!`,
      "skillAssessment": "Analyzing your skills and interests... Great potential detected! 💡",
      "careerAssessmentPrompt": "Let's assess your career potential! 🎯 Share your skills, interests, and experience level.",
      "internshipMatchPrompt": "Ready to find your dream internship? 💼 Tell me your desired role and location preferences.",
      "careerPlanPrompt": "I'll create your personalized career roadmap! 📊 Share your career goals and background.",
      "dashboardAccess": "Accessing your career dashboard...",
      "loginRequired": "Please log in to view your dashboard. 🔐",
      "loginSuccess": "Welcome back! Your career growth journey continues. 🌟",
      "technicalDifficulties": "I'm having technical difficulties. Please try again later. ⚡",
      "processingError": "Sorry, I couldn't process that. Let's try something else! 🤖",
    }
  },
  hi: {
    translation: {
      "searching": "खोज रहा है...",
      "careerNavigatorIsTyping": "कैरियर नेविगेटर टाइप कर रहा है",
      "typeYourMessage": "अपना संदेश टाइप करें...",
      "speakNow": "अभी बोलें...",
      "listening": "सुन रहा हूं...",
      "careerAssessmentTitle": "कैरियर मूल्यांकन",
      "internshipMatchingTitle": "इंटर्नशिप मिलान",
      "skillsPlaceholder": "आपके कौशल (जैसे Python, Marketing, Design)",
      "desiredRolePlaceholder": "वांछित भूमिका/इंटर्नशिप",
      "startAssessment": "मूल्यांकन शुरू करें",
      "searchInternships": "इंटर्नशिप खोजें",
      "assessmentSuccessMessage": "आपका {{type}} मूल्यांकन पूरा हो गया है! कैरियर पथ जनरेट किए गए।",
      "career": "कैरियर",
      "dashboardTitle": "आपका कैरियर डैशबोर्ड",
      "myApplications": "मेरे आवेदन",
      "careerPreferences": "कैरियर वरीयताएँ",
      "account": "खाता",
      "viewDetails": "विवरण देखें",
      "careerGoals": "कैरियर लक्ष्य",
      "learningResources": "सीखने के संसाधन",
      "accountInfo": "खाता जानकारी",
      "name": "नाम",
      "email": "ईमेल",
      "memberSince": "सदस्य जबसे",
      "subscription": "सदस्यता",
      "premiumMembership": "प्रीमियम कैरियर योजना",
      "aiPlannerTitle": "एआई कैरियर पथ योजनाकार",
      "generateCareerPath": "कैरियर पथ जनरेट करें",
      "resumeTips": "रिज्यूमे टिप्स",
      "interviewPrep": "इंटरव्यू तैयारी",
      "uploadResume": "रिज्यूमे अपलोड करें",
      "speakMessage": "संदेश बोलें",
      "botWelcome": "🎯 नमस्ते! मैं आपका एआई कैरियर नेविगेटर हूँ। मैं आपको कैरियर पथ खोजने, इंटर्नशिप ढूंढने और आपके पेशेवर विकास में मदद करूंगा! 🚀",
      "aboutUs": `कैरियर नेविगेटर में आपका स्वागत है - आपका एआई-पावर्ड कैरियर साथी! 🎓\n\n• व्यक्तिगत कैरियर सिफारिशें\n• एआई-चालित इंटर्नशिप मिलान\n• कौशल मूल्यांकन और अंतर विश्लेषण\n• सीखने के संसाधन सिफारिशें\n• 24/7 कैरियर मार्गदर्शन\n\nहमारे साथ अपनी कैरियर यात्रा शुरू करें!`,
      "skillAssessment": "आपके कौशल और रुचियों का विश्लेषण... बेहतरीन संभावनाएं मिली! 💡",
      "careerAssessmentPrompt": "आइए आपकी कैरियर क्षमता का आकलन करें! 🎯 अपने कौशल, रुचियों और अनुभव स्तर साझा करें।",
      "internshipMatchPrompt": "अपनी सपनों की इंटर्नशिप खोजने के लिए तैयार? 💼 मुझे अपनी वांछित भूमिका और स्थान वरीयताएं बताएं।",
      "careerPlanPrompt": "मैं आपका व्यक्तिगत कैरियर रोडमैप बनाऊंगा! 📊 अपने कैरियर लक्ष्य और पृष्ठभूमि साझा करें।"
    }
  },
  or: {
    translation: {
      "searching": "ସନ୍ଧାନ କରୁଛି...",
      "careerNavigatorIsTyping": "କ୍ୟାରିଅର ନେଭିଗେଟର ଟାଇପ୍ କରୁଛି",
      "typeYourMessage": "ଆପଣଙ୍କ ସନ୍ଦେଶ ଟାଇପ୍ କରନ୍ତୁ...",
      "speakNow": "ବର୍ତ୍ତମାନ କୁହନ୍ତୁ...",
      "listening": "ଶୁଣୁଛି...",
      "careerAssessmentTitle": "କ୍ୟାରିଅର ମୂଲ୍ୟାଙ୍କନ",
      "internshipMatchingTitle": "ଇଣ୍ଟର୍ନସିପ୍ ମେଳକ",
      "skillsPlaceholder": "ଆପଣଙ୍କର ଦକ୍ଷତା (ଯେପରି Python, Marketing, Design)",
      "desiredRolePlaceholder": "ଇଚ୍ଛିତ ଭୂମିକା/ଇଣ୍ଟର୍ନସିପ୍",
      "startAssessment": "ମୂଲ୍ୟାଙ୍କନ ଆରମ୍ଭ କରନ୍ତୁ",
      "searchInternships": "ଇଣ୍ଟର୍ନସିପ୍ ଖୋଜନ୍ତୁ",
      "assessmentSuccessMessage": "ଆପଣଙ୍କର {{type}} ମୂଲ୍ୟାଙ୍କନ ସମାପ୍ତ ହୋଇଛି! କ୍ୟାରିଅର ପଥ ପ୍ରସ୍ତୁତ କରାଯାଇଛି।",
      "career": "କ୍ୟାରିଅର",
      "dashboardTitle": "ଆପଣଙ୍କ କ୍ୟାରିଅର ଡ୍ୟାସବୋର୍ଡ",
      "myApplications": "ମୋର ଆବେଦନ",
      "careerPreferences": "କ୍ୟାରିଅର ପସନ୍ଦ",
      "account": "ଖାତା",
      "viewDetails": "ବିବରଣୀ ଦେଖନ୍ତୁ",
      "careerGoals": "କ୍ୟାରିଅର ଲକ୍ଷ୍ୟ",
      "learningResources": "ଶିଖିବାର ସମ୍ବଳ",
      "accountInfo": "ଖାତା ସୂଚନା",
      "name": "ନାମ",
      "email": "ଇମେଲ୍",
      "memberSince": "ସଦସ୍ୟତା ଆରମ୍ଭ",
      "subscription": "ଚଳନ୍ତି ଯୋଜନା",
      "premiumMembership": "ପ୍ରିମିୟମ୍ କ୍ୟାରିଅର ଯୋଜନା",
      "aiPlannerTitle": "AI କ୍ୟାରିଅର ପଥ ଯୋଜନାକାରୀ",
      "generateCareerPath": "କ୍ୟାରିଅର ପଥ ପ୍ରସ୍ତୁତ କରନ୍ତୁ",
      "resumeTips": "ରେଜ୍ୟୁମେ ଟିପ୍ସ",
      "interviewPrep": "ଇଣ୍ଟରଭ୍ୟୁ ପ୍ରସ୍ତୁତି",
      "uploadResume": "ରେଜ୍ୟୁମେ ଅପଲୋଡ୍ କରନ୍ତୁ",
      "speakMessage": "ସନ୍ଦେଶ କୁହନ୍ତୁ",
      "botWelcome": "🎯 ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କ୍ୟାରିଅର ନେଭିଗେଟର। ମୁଁ ଆପଣଙ୍କୁ କ୍ୟାରିଅର ପଥ ଖୋଜିବା, ଇଣ୍ଟର୍ନସିପ୍ ଖୋଜିବା ଏବଂ ଆପଣଙ୍କର ବୃତ୍ତିଗତ ବୃଦ୍ଧି ପରିଚାଳନାରେ ସାହାଯ୍ୟ କରିବି! 🚀",
      "aboutUs": `କ୍ୟାରିଅର ନେଭିଗେଟରକୁ ସ୍ୱାଗତ - ଆପଣଙ୍କର AI-ଶକ୍ତିଶାଳୀ କ୍ୟାରିଅର ସାଥୀ! 🎓\n\n• ବ୍ୟକ୍ତିଗତ କ୍ୟାରିଅର ସୁପାରିଶ\n• AI-ଚାଳିତ ଇଣ୍ଟର୍ନସିପ୍ ମେଳ\n• ଦକ୍ଷତା ମୂଲ୍ୟାଙ୍କନ ଏବଂ ଫାଙ୍କ ବିଶ୍ଳେଷଣ\n• ଶିଖିବା ସମ୍ବଳ ସୁପାରିଶ\n• 24/7 କ୍ୟାରିଅର ମାର୍ଗଦର୍ଶନ\n\nଆମ ସହିତ ଆପଣଙ୍କ କ୍ୟାରିଅର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ!`,
      "skillAssessment": "ଆପଣଙ୍କର ଦକ୍ଷତା ଏବଂ ଆଗ୍ରହର ବିଶ୍ଳେଷଣ... ଉତ୍ତମ ସମ୍ଭାବନା ଚିହ୍ନଟ ହୋଇଛି! 💡",
      "careerAssessmentPrompt": "ଆସନ୍ତୁ ଆପଣଙ୍କର କ୍ୟାରିଅର ସମ୍ଭାବନା ମୂଲ୍ୟାଙ୍କନ କରିବା! 🎯 ଆପଣଙ୍କର ଦକ୍ଷତା, ଆଗ୍ରହ, ଏବଂ ଅନୁଭବ ସ୍ତର ବାଣ୍ଟନ୍ତୁ।",
      "internshipMatchPrompt": "ଆପଣଙ୍କର ସ୍ୱପ୍ନର ଇଣ୍ଟର୍ନସିପ୍ ଖୋଜିବାକୁ ପ୍ରସ୍ତୁତ? 💼 ମୋତେ ଆପଣଙ୍କର ଇଚ୍ଛିତ ଭୂମିକା ଏବଂ ସ୍ଥାନ ପସନ୍ଦ କୁହନ୍ତୁ।",
      "careerPlanPrompt": "ମୁଁ ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ କ୍ୟାରିଅର ରୋଡମ୍ୟାପ୍ ସୃଷ୍ଟି କରିବି! 📊 ଆପଣଙ୍କର କ୍ୟାରିଅର ଲକ୍ଷ୍ୟ ଏବଂ ପୃଷ୍ଠଭୂମି ବାଣ୍ଟନ୍ତୁ।"
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Get API key from environment variable (Vite format)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCGSaYmZuKOeJGldUgl-4HM2CXbG74Qh64';

// Advanced Chat Components
const FeedbackButtons = ({ onFeedback, messageId }) => {
  const { t } = useTranslation();
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (isHelpful) => {
    onFeedback(messageId, isHelpful);
    setFeedbackGiven(true);
    setTimeout(() => setFeedbackGiven(false), 3000);
  };

  if (feedbackGiven) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
        <ThumbsUp size={14} />
        <span>{t('thanksFeedback')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      <span className="text-sm text-gray-500">{t('feedbackHelpful')}</span>
      <div className="flex gap-1">
        <button
          onClick={() => handleFeedback(true)}
          className="p-1 rounded hover:bg-green-100 transition-colors"
          title={t('yes')}
        >
          <ThumbsUp size={14} className="text-gray-500 hover:text-green-600" />
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="p-1 rounded hover:bg-red-100 transition-colors"
          title={t('no')}
        >
          <ThumbsDown size={14} className="text-gray-500 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

const MessageActions = ({ 
  onSave, 
  onShare, 
  onCopy, 
  onReadAloud, 
  isAudioLoading,
  messageText 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={onSave}
        className="p-1 rounded hover:bg-blue-100 transition-colors"
        title="Save response"
      >
        <Bookmark size={14} className="text-gray-500 hover:text-blue-600" />
      </button>
      <button
        onClick={onShare}
        className="p-1 rounded hover:bg-green-100 transition-colors"
        title="Share response"
      >
        <Share size={14} className="text-gray-500 hover:text-green-600" />
      </button>
      <button
        onClick={handleCopy}
        className="p-1 rounded hover:bg-purple-100 transition-colors"
        title={copied ? "Copied!" : "Copy text"}
      >
        <FileText size={14} className={`${copied ? 'text-purple-600' : 'text-gray-500 hover:text-purple-600'}`} />
      </button>
      <button
        onClick={() => onReadAloud(messageText)}
        disabled={isAudioLoading}
        className="p-1 rounded hover:bg-orange-100 transition-colors disabled:opacity-50"
        title="Read aloud"
      >
        {isAudioLoading ? (
          <Loader2 size={14} className="animate-spin text-orange-600" />
        ) : (
          <Volume2 size={14} className="text-gray-500 hover:text-orange-600" />
        )}
      </button>
    </div>
  );
};

const SpeechToTextButton = ({ onTranscript, isListening, disabled }) => {
  const { t } = useTranslation();
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = i18n.language;

    recognitionRef.current.onstart = () => {
      onTranscript('', true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      onTranscript(transcript, true);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onTranscript('', false);
    };

    recognitionRef.current.onend = () => {
      onTranscript('', false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'bg-green-500 hover:bg-green-600 text-white'
      } disabled:bg-gray-300 disabled:cursor-not-allowed`}
      title={isListening ? t('stopSpeaking') : t('clickToSpeak')}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};

const ChatHistoryPanel = ({ 
  isOpen, 
  onClose, 
  messages, 
  onLoadConversation,
  onClearHistory 
}) => {
  const { t } = useTranslation();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('careerChatConversations');
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  }, []);

  const saveCurrentConversation = () => {
    if (messages.length > 1) {
      const newConversation = {
        id: Date.now().toString(),
        title: `Conversation ${new Date().toLocaleDateString()}`,
        messages: messages,
        timestamp: new Date().toISOString()
      };
      
      const updatedConversations = [newConversation, ...conversations.slice(0, 9)];
      setConversations(updatedConversations);
      localStorage.setItem('careerChatConversations', JSON.stringify(updatedConversations));
    }
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'Career Navigator'}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white z-10 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">{t('conversationHistory')}</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
          <span className="text-xl">×</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2">
          <button
            onClick={saveCurrentConversation}
            disabled={messages.length <= 1}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Current Conversation
          </button>
          <button
            onClick={exportChat}
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {t('exportChat')}
          </button>
          <button
            onClick={onClearHistory}
            className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {t('clearChat')}
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Saved Conversations</h4>
          {conversations.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No saved conversations</p>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => onLoadConversation(conv.messages)}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium">{conv.title}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(conv.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conv.messages[1]?.text || 'No messages'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Clean response function to remove markdown and formatting
const cleanResponse = (text) => {
  if (!text) return text;
  
  // Remove markdown symbols, asterisks, hashes, etc.
  let cleaned = text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1')     // Remove italic
    .replace(/#{1,6}\s?/g, '')       // Remove headers
    .replace(/```[\s\S]*?```/g, '')  // Remove code blocks
    .replace(/`(.*?)`/g, '$1')       // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/\n{3,}/g, '\n\n')      // Replace multiple newlines with double
    .replace(/\s+\./g, '.')          // Fix spaces before periods
    .replace(/\s+,/g, ',')           // Fix spaces before commas
    .trim();
  
  // Ensure proper spacing after punctuation
  cleaned = cleaned.replace(/([.!?])([A-Za-z])/g, '$1 $2');
  
  return cleaned;
};

const EnhancedMessage = ({ 
  text, 
  sender, 
  image, 
  onPlayAudio, 
  isAudioLoading,
  messageId,
  onFeedback,
  onSaveMessage,
  onShareMessage 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cleanedText = cleanResponse(text);
  const shouldTruncate = cleanedText.length > 300;

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} px-4 py-2 group`}>
      <div className={`max-w-[85%] p-3 rounded-xl ${sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-blue-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
        <div className="flex items-start gap-2">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${sender === 'user' ? 'bg-blue-700' : 'bg-blue-100'}`}>
            {sender === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-blue-600" />}
          </div>
          <div className="flex-1 min-w-0">
            {image && <img src={image} alt="Uploaded content" className="w-full max-h-64 object-contain rounded-lg mb-2 border border-gray-300" />}
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {shouldTruncate && !isExpanded ? (
                <>
                  {cleanedText.slice(0, 300)}...
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="ml-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Read more
                  </button>
                </>
              ) : (
                <>
                  {cleanedText}
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="ml-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Show less
                    </button>
                  )}
                </>
              )}
            </div>
            
            {/* Message actions for bot messages */}
            {sender === 'bot' && (
              <div className="space-y-1">
                <MessageActions
                  onSave={() => onSaveMessage(messageId, cleanedText)}
                  onShare={() => onShareMessage(cleanedText)}
                  onCopy={() => navigator.clipboard.writeText(cleanedText)}
                  onReadAloud={onPlayAudio}
                  isAudioLoading={isAudioLoading}
                  messageText={cleanedText}
                />
                <FeedbackButtons 
                  onFeedback={onFeedback}
                  messageId={messageId}
                />
              </div>
            )}
          </div>
          {sender === 'bot' && onPlayAudio && (
            <button 
              onClick={() => onPlayAudio(cleanedText)} 
              disabled={isAudioLoading}
              className="ml-2 p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors disabled:cursor-not-allowed disabled:opacity-50" 
              aria-label="Play message"
            >
              {isAudioLoading ? <Loader2 size={18} className="animate-spin" /> : <Volume2 size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CareerAssessmentForm = ({ type }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        skills: '',
        interests: '',
        experienceLevel: '',
        desiredRole: '',
        locationPreference: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assessmentStatus, setAssessmentStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        setTimeout(() => {
            const details = type === 'assessment'
                ? `${formData.skills || t('unknownField')} in ${formData.interests || t('unknownField')}`
                : `${formData.desiredRole || t('unknownField')} at ${formData.locationPreference || t('unknownField')}`;
            
            setAssessmentStatus(
                type === 'assessment' 
                    ? t('assessmentSuccessMessage', { type: t('career'), details })
                    : t('internshipSuccessMessage', { role: formData.desiredRole || t('unknownField'), location: formData.locationPreference || t('unknownField') })
            );
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="p-6 bg-white rounded-xl m-4 border border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
                {type === 'assessment' ? t('careerAssessmentTitle') : t('internshipMatchingTitle')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'assessment' ? (
                    <>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                placeholder={t('skillsPlaceholder')}
                                className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="relative">
                            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <input
                                type="text"
                                name="interests"
                                value={formData.interests}
                                onChange={handleInputChange}
                                placeholder={t('interestsPlaceholder')}
                                className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="relative">
                            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <select
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleInputChange}
                                className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">{t('experienceLevelPlaceholder')}</option>
                                <option value="student">Student/Entry Level</option>
                                <option value="junior">Junior (1-3 years)</option>
                                <option value="mid">Mid-Level (4-7 years)</option>
                                <option value="senior">Senior (8+ years)</option>
                            </select>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <input
                                type="text"
                                name="desiredRole"
                                value={formData.desiredRole}
                                onChange={handleInputChange}
                                placeholder={t('desiredRolePlaceholder')}
                                className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                            <input
                                type="text"
                                name="locationPreference"
                                value={formData.locationPreference}
                                onChange={handleInputChange}
                                placeholder={t('locationPreferencePlaceholder')}
                                className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </>
                )}
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-3 rounded-full font-medium transition-colors ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={18} />
                            {t('searching')}
                        </span>
                    ) : (
                        type === 'assessment' ? t('startAssessment') : t('searchInternships')
                    )}
                </button>
            </form>
            
            {assessmentStatus && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-2 border border-blue-200">
                    <ShieldCheck className="text-blue-600" />
                    <span className="text-blue-800">{assessmentStatus}</span>
                </div>
            )}
        </div>
    );
};

const Dashboard = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('applications');

    return (
        <div className="p-6 bg-white rounded-xl m-4 border border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">{t('dashboardTitle')}</h2>
            
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('applications')}
                    className={`px-4 py-2 font-medium ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                >
                    {t('myApplications')}
                </button>
                <button
                    onClick={() => setActiveTab('preferences')}
                    className={`px-4 py-2 font-medium ${activeTab === 'preferences' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                >
                    {t('careerPreferences')}
                </button>
                <button
                    onClick={() => setActiveTab('account')}
                    className={`px-4 py-2 font-medium ${activeTab === 'account' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                >
                    {t('account')}
                </button>
            </div>
            
            {activeTab === 'applications' && (
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium flex items-center gap-2 text-gray-800">
                                <Building className="text-blue-600" /> Software Engineer Intern
                            </h3>
                            <span className="text-sm text-gray-600">Google • Applied: Oct 25, 2023</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-600">Status: Under Review</span>
                            <button className="text-blue-600 hover:underline text-sm">{t('viewDetails')}</button>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium flex items-center gap-2 text-gray-800">
                                <Building className="text-blue-600" /> Data Analyst
                            </h3>
                            <span className="text-sm text-gray-600">Microsoft • Applied: Oct 20, 2023</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-green-600">Status: Interview Scheduled</span>
                            <button className="text-blue-600 hover:underline text-sm">{t('viewDetails')}</button>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'preferences' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-800">
                            <Target className="text-blue-600" /> {t('careerGoals')}
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="mb-2 text-gray-700">{t('prefIndustry')}</p>
                            <p className="mb-2 text-gray-700">{t('prefRole')}</p>
                            <p className="mb-2 text-gray-700">{t('prefLocation')}</p>
                            <p className="text-gray-700">{t('prefSalary')}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-800">
                            <BookOpen className="text-blue-600" /> {t('learningResources')}
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="mb-2 text-gray-700">{t('recommendedCourses')}</p>
                            <p className="text-gray-700">{t('skillGaps')}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'account' && (
                <div className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-800">
                            <User className="text-blue-600" /> {t('accountInfo')}
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
                            <div><p className="text-gray-600 text-sm">{t('name')}</p><p className="text-gray-800">Career Seeker</p></div>
                            <div><p className="text-gray-600 text-sm">{t('email')}</p><p className="text-gray-800">career@example.com</p></div>
                            <div><p className="text-gray-600 text-sm">{t('memberSince')}</p><p className="text-gray-800">January 2023</p></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2 text-gray-800">
                            <ShieldCheck className="text-blue-600" /> {t('subscription')}
                        </h3>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-gray-800">{t('premiumMembership')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AICareerPlanner = () => {
    const { t } = useTranslation();
    return (
        <div className="p-6 bg-white rounded-xl m-4 border border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">{t('aiPlannerTitle')}</h2>
            <div className="space-y-4">
                <p className="text-gray-700">{t('aiPlannerPrompt')}</p>
                <form className="space-y-4">
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input type="text" placeholder={t('skillsPlaceholder')} className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
                        <input type="text" placeholder="Education Background" className="w-full pl-10 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <textarea placeholder={t('aiPlannerGoalsPlaceholder')} rows="3" className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="submit" className="w-full p-3 rounded-full font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white">
                        {t('generateCareerPath')}
                    </button>
                </form>
            </div>
        </div>
    );
};

const TypingIndicator = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center gap-2 bg-white border border-blue-200 p-3 rounded-xl rounded-bl-none max-w-xs shadow-sm">
            <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-gray-600">{t('careerNavigatorIsTyping')}</span>
        </div>
    );
};

const ChatInput = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  isTyping, 
  setImageFile, 
  showMenu, 
  setShowMenu, 
  menuRef, 
  getBotResponse,
  onSpeechTranscript,
  isListening 
}) => {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    const handleImageClick = () => fileInputRef.current?.click();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setImageFile(file);
    };

    const handleQuickAction = (action) => {
        setShowMenu(false);
        getBotResponse(action);
    };

    return (
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-blue-200">
            <div className="flex items-center gap-2">
                <div className="relative" ref={menuRef}>
                    <button type="button" onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors" aria-label="Quick actions">
                        <MoreVertical size={20} />
                    </button>
                    {showMenu && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-blue-200 z-10">
                            <button type="button" onClick={() => handleQuickAction('resume tips for tech jobs')} className="w-full text-left flex items-center gap-2 p-3 hover:bg-blue-50 transition-colors text-gray-800">
                                <BookOpen size={18} className="text-blue-600" />
                                <span>{t('resumeTips')}</span>
                            </button>
                            <button type="button" onClick={() => handleQuickAction('interview preparation for software engineer')} className="w-full text-left flex items-center gap-2 p-3 hover:bg-blue-50 transition-colors text-gray-800">
                                <Target size={18} className="text-blue-600" />
                                <span>{t('interviewPrep')}</span>
                            </button>
                            <button type="button" onClick={handleImageClick} className="w-full text-left flex items-center gap-2 p-3 hover:bg-blue-50 transition-colors text-gray-800">
                                <FileText size={18} className="text-blue-600" />
                                <span>{t('uploadResume')}</span>
                            </button>
                        </div>
                    )}
                </div>
                
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" className="hidden" />
                
                <SpeechToTextButton
                  onTranscript={onSpeechTranscript}
                  isListening={isListening}
                  disabled={isTyping}
                />
                
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder={isListening ? t('speakNow') : (isTyping ? t('careerNavigatorIsTyping') : t('typeYourMessage'))} 
                  disabled={isTyping} 
                  className="flex-1 p-3 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                
                <button type="submit" disabled={isTyping || (!input.trim() && !fileInputRef.current?.files?.length)} className={`p-2 rounded-full transition-colors ${isTyping || (!input.trim() && !fileInputRef.current?.files?.length) ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} aria-label="Send message">
                    <Send size={20} className="text-white" />
                </button>
            </div>
            
            {isListening && (
                <div className="mt-2 flex items-center gap-2 text-green-600">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm">{t('listening')}</span>
                </div>
            )}
        </form>
    );
};

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'or', name: 'ଓଡ଼ିଆ' }
    ];

    return (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            {languages.map(lang => (
                <button 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${i18n.resolvedLanguage === lang.code ? 'bg-blue-600 text-white' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'}`}
                >
                    {lang.name}
                </button>
            ))}
        </div>
    );
}

const AppCore = () => {
    const { t, i18n } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [currentView, setCurrentView] = useState('chat');
    const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const messagesEndRef = useRef(null);
    const audioRef = useRef(null);
    const menuRef = useRef(null);
    
    useEffect(() => {
        setMessages([{ text: t('botWelcome'), sender: 'bot', id: 'welcome' }]);
    }, [t]);

    useEffect(() => { scrollToBottom(); }, [messages]);

    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
        return () => { if (context.state !== 'closed') context.close(); };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setShowMenu(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const base64ToArrayBuffer = (base64) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    const pcmToWav = (pcmData, sampleRate) => {
        const buffer = new ArrayBuffer(44 + pcmData.length * 2);
        const view = new DataView(buffer);
        let offset = 0;

        // RIFF header
        view.setUint32(offset, 0x52494646, false); offset += 4;
        view.setUint32(offset, 36 + pcmData.length * 2, true); offset += 4;
        view.setUint32(offset, 0x57415645, false); offset += 4;

        // fmt chunk
        view.setUint32(offset, 0x666d7420, false); offset += 4;
        view.setUint32(offset, 16, true); offset += 4;
        view.setUint16(offset, 1, true); offset += 2;
        view.setUint16(offset, 1, true); offset += 2;
        view.setUint32(offset, sampleRate, true); offset += 4;
        view.setUint32(offset, sampleRate * 2, true); offset += 4;
        view.setUint16(offset, 2, true); offset += 2;
        view.setUint16(offset, 16, true); offset += 2;

        // data chunk
        view.setUint32(offset, 0x64617461, false); offset += 4;
        view.setUint32(offset, pcmData.length * 2, true); offset += 4;

        for (let i = 0; i < pcmData.length; i++, offset += 2) {
            view.setInt16(offset, pcmData[i], true);
        }

        return new Blob([view], { type: 'audio/wav' });
    };

    const playTextToSpeech = async (text) => {
        if (isAudioLoading) {
            console.log("Audio request already in progress.");
            return;
        }
        if (!audioContext || !audioRef.current) {
            console.error("Audio not initialized");
            return;
        }

        setIsAudioLoading(true);
        try {
            const payload = {
                contents: [{ parts: [{ text }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } }
                    }
                },
                model: "gemini-1.5-flash"
            };

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) throw new Error(await response.text());

            const result = await response.json();
            const audioData = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            const mimeType = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType;

            if (audioData && mimeType?.startsWith("audio/")) {
                const sampleRate = mimeType.match(/rate=(\d+)/)?.[1] || 16000;
                const pcmBuffer = base64ToArrayBuffer(audioData);
                const pcm16 = new Int16Array(pcmBuffer);
                const wavBlob = pcmToWav(pcm16, sampleRate);
                audioRef.current.src = URL.createObjectURL(wavBlob);
                await audioRef.current.play();
            }
        } catch (error) {
            console.error("TTS error:", error);
        } finally {
            setIsAudioLoading(false);
        }
    };

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSpeechTranscript = (transcript, listening) => {
        setIsListening(listening);
        if (transcript) {
            setInput(transcript);
        }
    };

    const handleFeedback = (messageId, isHelpful) => {
        console.log(`Feedback for message ${messageId}: ${isHelpful ? 'helpful' : 'not helpful'}`);
        // In a real app, you would send this to your analytics/feedback system
    };

    const handleSaveMessage = (messageId, text) => {
        const savedMessages = JSON.parse(localStorage.getItem('savedCareerMessages') || '[]');
        const newSavedMessage = {
            id: Date.now().toString(),
            originalId: messageId,
            text: text,
            timestamp: new Date().toISOString()
        };
        savedMessages.push(newSavedMessage);
        localStorage.setItem('savedCareerMessages', JSON.stringify(savedMessages));
        alert('Message saved!');
    };

    const handleShareMessage = async (text) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Career Navigator Advice',
                    text: text
                });
            } catch (error) {
                console.log('Sharing cancelled', error);
            }
        } else {
            await navigator.clipboard.writeText(text);
            alert('Message copied to clipboard!');
        }
    };

    const clearChat = () => {
        setMessages([{ text: t('botWelcome'), sender: 'bot', id: 'welcome' }]);
        setCurrentView('chat');
    };

    const loadConversation = (conversationMessages) => {
        setMessages(conversationMessages);
        setCurrentView('chat');
        setShowHistory(false);
    };

    const getBotResponse = async (userMessage, uploadedImageBase64) => {
        setIsTyping(true);
        let responseText = '';
        let newView = 'chat';
        let data = null;
        let geminiPrompt = '';
        const currentLanguage = i18n.language;

        const lowerCaseMessage = userMessage.toLowerCase();

        if (!apiKey) {
            responseText = t('technicalDifficulties');
            setIsTyping(false);
            setMessages(prev => [...prev, { text: responseText, sender: 'bot', view: newView, data, id: Date.now().toString() }]);
            return;
        }

        if (lowerCaseMessage.includes('resume tips')) {
            const jobType = lowerCaseMessage.match(/resume tips for (.+)/i)?.[1]?.trim() || 'tech jobs';
            geminiPrompt = `Provide comprehensive resume tips for ${jobType}. Include sections for formatting, key skills to highlight, and common mistakes to avoid. Respond in clean, readable text without markdown formatting in ${currentLanguage}.`;
        } else if (lowerCaseMessage.includes('interview preparation') || lowerCaseMessage.includes('interview prep')) {
            const role = lowerCaseMessage.match(/interview preparation for (.+)/i)?.[1]?.trim() || 'software engineer';
            geminiPrompt = `Give detailed interview preparation advice for ${role} position. Include technical questions, behavioral questions, and preparation strategies. Respond in clean, readable text without markdown formatting in ${currentLanguage}.`;
        } else if (uploadedImageBase64) {
            geminiPrompt = `Analyze this resume/CV image and provide improvement suggestions for career advancement. Respond in clean, readable text without markdown formatting in ${currentLanguage}.`;
        } else if (/hello|hi/.test(lowerCaseMessage)) {
            responseText = t('botWelcome');
        } else if (/career navigator|about your platform|platform features/.test(lowerCaseMessage)) {
            responseText = t('aboutUs');
        } else if (lowerCaseMessage.includes('skill assessment') || lowerCaseMessage.includes('assess my skills')) {
            responseText = t('skillAssessment');
        } else if (lowerCaseMessage.includes('career assessment') || lowerCaseMessage.includes('assess my career')) {
            responseText = t('careerAssessmentPrompt');
            newView = 'assessment';
            data = { type: 'assessment' };
        } else if (lowerCaseMessage.includes('find internship') || lowerCaseMessage.includes('internship match')) {
            responseText = t('internshipMatchPrompt');
            newView = 'assessment';
            data = { type: 'internship' };
        } else if (lowerCaseMessage.includes('career plan') || lowerCaseMessage.includes('career roadmap')) {
            responseText = t('careerPlanPrompt');
            newView = 'ai-planner';
        } else if (/my dashboard|my applications/.test(lowerCaseMessage)) {
            responseText = userIsAuthenticated ? t('dashboardAccess') : t('loginRequired');
            newView = userIsAuthenticated ? 'dashboard' : 'chat';
        } else if (/login|register/.test(lowerCaseMessage)) {
            setUserIsAuthenticated(true);
            responseText = t('loginSuccess');
        } else {
            geminiPrompt = `As a friendly AI career advisor for Career Navigator, respond to this career-related query with helpful advice. Focus on career guidance, skill development, job search, and professional growth. Respond in clean, readable text without markdown formatting, asterisks, or special symbols in ${currentLanguage}. Query: ${userMessage}`;
        }

        if (geminiPrompt) {
            try {
                 const contents = uploadedImageBase64
                    ? [{ role: "user", parts: [{ text: geminiPrompt }, { inlineData: { mimeType: "image/png", data: uploadedImageBase64 } }]}]
                    : [{ role: "user", parts: [{ text: geminiPrompt }] }];
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({ contents }) 
                });
                if (!response.ok) throw new Error(await response.text());
                const result = await response.json();
                responseText = cleanResponse(result.candidates?.[0]?.content?.parts?.[0]?.text || t('processingError'));
            } catch (error) {
                console.error("AI error:", error);
                responseText = t('technicalDifficulties');
            }
        }

        setTimeout(() => {
            setMessages(prev => [...prev, { 
                text: responseText, 
                sender: 'bot', 
                view: newView, 
                data, 
                id: Date.now().toString() 
            }]);
            setCurrentView(newView);
            setIsTyping(false);
        }, 1500);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() && !imageFile) return;

        const userMessage = input.trim();
        let uploadedImageBase64 = null;

        if (imageFile) {
            try {
                uploadedImageBase64 = await convertImageToBase64(imageFile);
                setMessages(prev => [...prev, { 
                    text: 'Resume/CV uploaded', 
                    sender: 'user', 
                    image: URL.createObjectURL(imageFile),
                    id: Date.now().toString()
                }]);
                setImageFile(null);
            } catch (error) {
                console.error("Image upload error:", error);
            }
        }

        if (userMessage) {
            setMessages(prev => [...prev, { 
                text: userMessage, 
                sender: 'user', 
                id: Date.now().toString() 
            }]);
            setInput('');
        }

        if (userMessage || uploadedImageBase64) {
            await getBotResponse(userMessage, uploadedImageBase64);
        }
    };

    const renderContent = () => {
        const lastMessage = messages[messages.length - 1];
        switch (lastMessage?.view || 'chat') {
            case 'assessment': return <CareerAssessmentForm type={lastMessage.data?.type} />;
            case 'dashboard': return <Dashboard />;
            case 'ai-planner': return <AICareerPlanner />;
            default:
                return (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <EnhancedMessage 
                                    key={msg.id} 
                                    text={msg.text} 
                                    sender={msg.sender} 
                                    image={msg.image} 
                                    onPlayAudio={msg.sender === 'bot' ? playTextToSpeech : null}
                                    isAudioLoading={isAudioLoading}
                                    messageId={msg.id}
                                    onFeedback={handleFeedback}
                                    onSaveMessage={handleSaveMessage}
                                    onShareMessage={handleShareMessage}
                                />
                            ))}
                            {isTyping && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>
                        <ChatInput 
                            input={input}
                            setInput={setInput}
                            handleSendMessage={handleSendMessage}
                            isTyping={isTyping}
                            setImageFile={setImageFile}
                            showMenu={showMenu}
                            setShowMenu={setShowMenu}
                            menuRef={menuRef}
                            getBotResponse={getBotResponse}
                            onSpeechTranscript={handleSpeechTranscript}
                            isListening={isListening}
                        />
                    </div>
                );
        }
    };

    return (
        <div className={`flex flex-col h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} relative transition-colors duration-200`}>
            <LanguageSwitcher />
            
            {/* Header with advanced controls */}
            <header className="flex items-center justify-between p-4 border-b border-blue-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white transition-colors"
                        title={t('conversationHistory')}
                    >
                        <Clock size={20} />
                    </button>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white transition-colors"
                        title={darkMode ? t('lightMode') : t('darkMode')}
                    >
                        {darkMode ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
                <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Career Navigator</h1>
                <div className="w-10"></div> {/* Spacer for balance */}
            </header>

            <main className="flex-1 flex flex-col overflow-hidden">
                {showHistory ? (
                    <ChatHistoryPanel
                        isOpen={showHistory}
                        onClose={() => setShowHistory(false)}
                        messages={messages}
                        onLoadConversation={loadConversation}
                        onClearHistory={clearChat}
                    />
                ) : (
                    <div className={`flex-1 flex flex-col rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-200'} shadow-sm overflow-hidden`}>
                        {renderContent()}
                    </div>
                )}
            </main>
            <audio ref={audioRef} className="hidden" />
        </div>
    );
};

const App = () => (
    <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="flex items-center gap-2 text-blue-600">
                <Loader2 className="animate-spin" size={24} />
                <span>Loading Career Navigator...</span>
            </div>
        </div>
    }>
      <I18nextProvider i18n={i18n}>
        <AppCore />
      </I18nextProvider>
    </Suspense>
);

export default App;