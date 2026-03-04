import { useState, useRef, useCallback } from 'react';

export const useAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Simulate audio levels and timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setAudioLevel(Math.floor(Math.random() * 100));
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      setIsRecording(false);
    }
  }, [isRecording]);

  const resetRecording = useCallback(() => {
    stopRecording();
    setAudioLevel(0);
    setAudioBlob(null);
    setRecordingTime(0);
    audioChunksRef.current = [];
  }, [stopRecording]);

  return {
    isRecording,
    audioLevel,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    resetRecording
  };
};

export default useAudio;