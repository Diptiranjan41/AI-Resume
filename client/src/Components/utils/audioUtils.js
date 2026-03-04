// Enhanced siren function
export const generateSirenSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.5);
    
    oscillator.start();
    
    return {
      stop: () => {
        try {
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
          setTimeout(() => {
            oscillator.stop();
            audioContext.close();
          }, 100);
        } catch (error) {
          console.error('Error stopping siren:', error);
        }
      }
    };
  } catch (error) {
    console.error('Error creating siren sound:', error);
    return { stop: () => {} };
  }
};

// Text-to-Speech function
export const speakText = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => 
      voice.lang.includes('en') && voice.name.includes('Female')
    ) || voices.find(voice => voice.lang.includes('en'));
    
    if (englishVoice) {
      speech.voice = englishVoice;
    }
    
    window.speechSynthesis.speak(speech);
    return speech;
  }
  return null;
};

// Speech-to-Text function
export const initializeSpeechRecognition = () => {
  if (typeof window === 'undefined') return null;
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported in this browser');
    return null;
  }

  return SpeechRecognition;
};