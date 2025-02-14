import { useEffect, useState, useCallback } from 'react';

function useCountdown(initialSeconds: number, onComplete?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 1) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalId);
          onComplete?.();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [key, onComplete]);

  const resetCountdown = useCallback(() => {
    setSeconds(initialSeconds);
    setKey((prevKey) => prevKey + 1);
  }, [initialSeconds]);

  return [seconds, resetCountdown] as const;
}

export default useCountdown;
