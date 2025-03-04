import { useEffect, useRef } from 'react';

const Operators = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');

      const drawFrame = () => {
        if (!ctx || video.paused || video.ended) return;
        ctx.fillStyle = 'rgba(0, 128, 128, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      };

      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
      });

      video.addEventListener('play', () => {
        drawFrame();
      });
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="absolute w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          src="https://web-static.hg-cdn.com/endfield/official-v3/oversea/protectedAssets/chen-s4FOfmRxwR0B5XVY/video.mp4"
        />
        <canvas ref={canvasRef} className="w-full h-80" />
        <img
          src="https://web-static.hg-cdn.com/endfield/official-v3/oversea/assets/img/illust.2730c2.png"
          alt="Chen Qianyu"
        />
      </div>
    </div>
  );
};

export default Operators;
