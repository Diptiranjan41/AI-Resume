import React from "react";

const QuestionSection = ({
  interviewState,
  audioState,
  updateInterviewState,
  handleAnswerChange,
  speakQuestion,
  startListening,
  stopListening,
  registerCurrentFace
}) => {
  const extractQuestionText = (question) => {
    if (!question) return "Question not available";
    if (typeof question === 'string') return question;
    if (typeof question === 'object' && question !== null) {
      return question.question || question.text || question.title || JSON.stringify(question);
    }
    return "Question not available";
  };

  const renderCurrentQuestion = () => {
    if (!interviewState.questionsLoaded) {
      return "Loading questions from backend...";
    }

    let question;
    if (interviewState.currentSection === "descriptive") {
      question = interviewState.currentQuestions[interviewState.currentQuestion];
    } else if (interviewState.currentSection === "mcq") {
      question = interviewState.mcqQuestions[interviewState.currentQuestion];
    } else if (interviewState.currentSection === "aptitude") {
      question = interviewState.aptitudeQuestions[interviewState.currentQuestion];
    }

    return extractQuestionText(question);
  };

  const getCurrentOptions = () => {
    if (interviewState.currentSection === "mcq") {
      const mcqQuestion = interviewState.mcqQuestions[interviewState.currentQuestion];
      return mcqQuestion?.options || [];
    } else if (interviewState.currentSection === "aptitude") {
      const aptitudeQuestion = interviewState.aptitudeQuestions[interviewState.currentQuestion];
      return aptitudeQuestion?.options || [];
    }
    return [];
  };

  const getCurrentAnswer = () => {
    if (interviewState.currentSection === "descriptive") {
      return interviewState.userAnswers[interviewState.currentQuestion] || "";
    } else if (interviewState.currentSection === "mcq") {
      return interviewState.mcqAnswers[interviewState.currentQuestion];
    } else if (interviewState.currentSection === "aptitude") {
      return interviewState.aptitudeAnswers[interviewState.currentQuestion];
    }
    return "";
  };

  const toggleHint = () => {
    updateInterviewState({ showHint: !interviewState.showHint });
  };

  const isInteractionBlocked = interviewState.cameraRequired && !interviewState.cameraEnabled;

  return (
    <>
      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {interviewState.currentSection === "descriptive" ? "Descriptive" : 
               interviewState.currentSection === "mcq" ? "Multiple Choice" : "Aptitude"} Question {interviewState.currentQuestion + 1} of {getTotalQuestionsInSection()}
            </h2>
            <p className="text-gray-600 text-sm">
              {interviewState.currentSection === "descriptive" ? "10 marks each" : 
               interviewState.currentSection === "mcq" ? "1 mark each" : "2 marks each"}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {interviewState.currentSection === "descriptive" ? "10 marks" : 
               interviewState.currentSection === "mcq" ? "1 mark" : "2 marks"}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {interviewState.difficulty}
            </span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-gray-800 text-lg leading-relaxed font-medium">
            {renderCurrentQuestion()}
          </p>
        </div>

        {/* Question Controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={speakQuestion}
            disabled={isInteractionBlocked || !renderCurrentQuestion()}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              audioState.isSpeaking 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            } ${isInteractionBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{audioState.isSpeaking ? '🛑 Stop' : '🔊 Listen'}</span>
          </button>

          <button
            onClick={toggleHint}
            disabled={isInteractionBlocked || interviewState.currentSection !== "descriptive"}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              interviewState.showHint 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            } ${isInteractionBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{interviewState.showHint ? '🙈 Hide Hint' : '💡 Show Hint'}</span>
          </button>

          {interviewState.interviewMode === "audio" && interviewState.currentSection === "descriptive" && (
            <button
              onClick={audioState.isListening ? stopListening : startListening}
              disabled={isInteractionBlocked || !interviewState.audioEnabled || !audioState.speechSupported}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                audioState.isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } ${isInteractionBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{audioState.isListening ? '🛑 Stop' : '🎤 Speak'}</span>
            </button>
          )}

          {/* Face Registration Button */}
          {interviewState.faceDetectionEnabled && interviewState.cameraEnabled && (
            <button
              onClick={registerCurrentFace}
              disabled={!interviewState.backendConnected}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            >
              <span>📷 Register Face</span>
            </button>
          )}
        </div>

        {/* Hint Section */}
        {interviewState.showHint && interviewState.currentSection === "descriptive" && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Hint</h4>
            <p className="text-yellow-700 text-sm">
              Focus on providing specific examples and structuring your answer clearly.
            </p>
          </div>
        )}
      </div>

      {/* Answer Section */}
      {interviewState.currentSection === "descriptive" ? (
        <DescriptiveAnswerSection
          interviewState={interviewState}
          audioState={audioState}
          handleAnswerChange={handleAnswerChange}
          isInteractionBlocked={isInteractionBlocked}
        />
      ) : (
        <MCQAnswerSection
          interviewState={interviewState}
          handleAnswerChange={handleAnswerChange}
          getCurrentAnswer={getCurrentAnswer}
          getCurrentOptions={getCurrentOptions}
        />
      )}
    </>
  );
};

const DescriptiveAnswerSection = ({ interviewState, audioState, handleAnswerChange, isInteractionBlocked }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <label className="block text-lg font-semibold text-gray-900 mb-4">
      Your Answer {interviewState.interviewMode === "audio" && "(Voice Input Available)"}
    </label>
    
    {/* Real-time speech recognition feedback */}
    {audioState.isListening && audioState.interimTranscript && (
      <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700">
          <strong>Listening:</strong> {audioState.interimTranscript}
        </p>
      </div>
    )}

    <textarea
      className={`w-full p-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-4 transition-all duration-200 ${
        isInteractionBlocked 
          ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
          : 'border-gray-300'
      }`}
      rows={8}
      value={getCurrentAnswer()}
      onChange={(e) => handleAnswerChange(e.target.value)}
      placeholder={
        isInteractionBlocked 
          ? "Please enable camera to start answering questions..." 
          : interviewState.interviewMode === "audio" 
          ? "Type your answer or use the microphone button to speak your answer..."
          : "Type your detailed answer here... The more specific and structured your answer, the better your score will be."
      }
      disabled={isInteractionBlocked}
    />
  </div>
);

const MCQAnswerSection = ({ interviewState, handleAnswerChange, getCurrentAnswer, getCurrentOptions }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <label className="block text-lg font-semibold text-gray-900 mb-4">
      Select Your Answer
    </label>
    <div className="space-y-3">
      {getCurrentOptions().map((option, index) => (
        <div
          key={index}
          onClick={() => handleOptionSelect(index)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            getCurrentAnswer() === index
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              getCurrentAnswer() === index
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-300'
            }`}>
              {getCurrentAnswer() === index && (
                <span className="text-xs">✓</span>
              )}
            </div>
            <span className="text-gray-800">{option}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionSection;