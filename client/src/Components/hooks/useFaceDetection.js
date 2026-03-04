import { useState, useRef, useCallback } from 'react';

export const useFaceDetection = () => {
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [faceDetectionStatus, setFaceDetectionStatus] = useState('idle');
  const [stats, setStats] = useState({
    confidenceScore: 0,
    lastDetectionTime: null,
    totalDetections: 0,
    missedFrames: 0,
    detectionHistory: []
  });
  
  const detectionIntervalRef = useRef(null);

  const initializeFaceDetection = useCallback(async (videoElement) => {
    try {
      setFaceDetectionStatus('loading');
      
      // Wait for video to be ready
      if (videoElement) {
        await new Promise((resolve) => {
          if (videoElement.readyState >= 2) {
            resolve();
          } else {
            videoElement.addEventListener('loadeddata', resolve, { once: true });
          }
        });
      }
      
      setFaceDetectionStatus('active');
      return true;
    } catch (error) {
      console.warn('Face detection initialization failed:', error);
      setFaceDetectionStatus('error');
      return false;
    }
  }, []);

  const startFaceDetection = useCallback(() => {
    if (faceDetectionStatus === 'active') return;
    
    setFaceDetectionStatus('active');
    setIsFaceDetected(true);
    
    detectionIntervalRef.current = setInterval(() => {
      const randomDetection = Math.random() > 0.3;
      setIsFaceDetected(randomDetection);
      
      setStats(prev => {
        const newDetection = {
          timestamp: new Date().toISOString(),
          detected: randomDetection,
          confidence: randomDetection ? Math.random() * 30 + 70 : Math.random() * 30
        };
        
        return {
          confidenceScore: randomDetection ? 
            Math.min(95, prev.confidenceScore + 2) : 
            Math.max(5, prev.confidenceScore - 5),
          lastDetectionTime: new Date().toISOString(),
          totalDetections: randomDetection ? prev.totalDetections + 1 : prev.totalDetections,
          missedFrames: randomDetection ? prev.missedFrames : prev.missedFrames + 1,
          detectionHistory: [...prev.detectionHistory.slice(-9), newDetection]
        };
      });
    }, 2000);
  }, [faceDetectionStatus]);

  const stopFaceDetection = useCallback(() => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    
    setFaceDetectionStatus('idle');
    setIsFaceDetected(false);
  }, []);

  return {
    isFaceDetected,
    faceDetectionStatus,
    stats,
    initializeFaceDetection,
    startFaceDetection,
    stopFaceDetection
  };
};

export default useFaceDetection;