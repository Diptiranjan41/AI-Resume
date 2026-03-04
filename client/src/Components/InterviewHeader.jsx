import React from "react";

const InterviewHeader = ({ interviewState, faceDetectionState }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getFaceStatusColor = () => {
    switch(faceDetectionState.faceRecognitionStatus) {
      case "SECURE": return "bg-green-500";
      case "VERIFYING": return "bg-yellow-500";
      case "ALERT": return "bg-orange-500";
      case "ALARM": return "bg-red-500";
      case "UNAUTHORIZED": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getFaceStatusText = () => {
    switch(faceDetectionState.faceRecognitionStatus) {
      case "SECURE": return "✅ Authorized User";
      case "VERIFYING": return "🔄 Verifying Identity";
      case "ALERT": return "⚠️ No Face Detected";
      case "ALARM": return "🚨 Security Breach";
      case "UNAUTHORIZED": return "❌ Unauthorized User";
      default: return "🔍 Face Detection";
    }
  };

  return (
    <>
      {/* Backend Status Indicator */}
      <div className="fixed top-4 left-4 z-40">
        <div className={`px-3 py-2 rounded-lg shadow-lg ${
          interviewState.backendConnected 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white animate-pulse'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {interviewState.backendConnected ? '✅ Backend Connected' : '❌ Backend Offline'}
            </span>
          </div>
        </div>
      </div>

      {/* Face Detection Status */}
      {interviewState.faceDetectionEnabled && faceDetectionState.faceDetectionActive && (
        <div className="fixed top-4 left-32 z-40">
          <div className={`px-3 py-2 rounded-lg shadow-lg ${getFaceStatusColor()} text-white`}>
            <div className="flex items-center gap-2">
              <span className="text-sm">{getFaceStatusText()}</span>
              {faceDetectionState.faceRecognitionConfidence > 0 && (
                <span className="text-xs bg-black bg-opacity-20 px-1 rounded">
                  {faceDetectionState.faceRecognitionConfidence.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-white">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Mock Interview</h1>
              <p className="text-gray-600 text-sm">
                {interviewState.backendConnected ? '✅ Cloud AI Evaluation' : '⚠️ Local Evaluation'}
                {interviewState.sirenPlaying ? " • 🚨 NETWORK ISSUE DETECTED" : ""}
                {interviewState.faceWarning ? " • 🚨 FACE NOT DETECTED" : ""}
                {interviewState.questionsLoaded ? " • ✅ Questions Loaded" : ""}
                {faceDetectionState.faceDetectionActive ? " • 🔍 Face Detection Active" : ""}
              </p>
            </div>
          </div>
          
          <div className="text-center sm:text-right">
            <div className="text-sm text-gray-600 mb-1">Time Remaining</div>
            <div className={`text-2xl font-bold ${
              interviewState.timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-gray-900'
            }`}>
              {formatTime(interviewState.timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewHeader;