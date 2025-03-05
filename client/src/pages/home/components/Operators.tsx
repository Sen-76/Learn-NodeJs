import { cn } from '@/helpers/util';
import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { opList } from './mock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Operators = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState<A>(opList[0]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions considering device pixel ratio
      const setCanvasDimensions = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx?.scale(dpr, dpr);
      };

      const drawFrame = () => {
        if (!ctx || video.paused || video.ended) return;
        const rect = canvas.getBoundingClientRect();
        ctx.drawImage(video, 0, 0, rect.width, rect.height);
        requestAnimationFrame(drawFrame);
      };

      setCanvasDimensions();
      video.addEventListener('play', drawFrame);
      window.addEventListener('resize', setCanvasDimensions);

      // Cleanup
      return () => {
        window.removeEventListener('resize', setCanvasDimensions);
        video.removeEventListener('play', drawFrame);
      };
    }
  }, []);

  const handleNext = () => setPosition((prev) => (prev + 3) % opList.length);
  const handlePrev = () => setPosition((prev) => (prev - 3 + opList.length) % opList.length);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 50,
  });

  return (
    <div className="w-full relative h-[710px] flex gap-10 bg-gray-200 items-center overflow-hidden">
      <div className="h-full w-28 bg-amber-300 flex items-center justify-center">
        <div className="rotate-90 font-extrabold text-[8rem] h-28 leading-28 text-gray-400/35 tracking-widest">
          ENDFIELD
        </div>
      </div>
      <div className="px-10 py-20 flex flex-col justify-between w-[576px] z-10 h-full">
        <div className="flex flex-col gap-2">
          <div className="font-semibold uppercase">{active.name}</div>
          <div className="font-semibold tracking-widest">
            <span className="text-gray-600">{active.index}/</span>
            <span className="text-gray-400">{opList.length}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-4xl tracking-tighter bg-gray-200/75 w-fit px-3">{active.name}</h3>
          <div className="w-full h-2 flex">
            <div className="w-1/6 h-full bg-black"></div>
            <div className="w-5/6 h-full bg-amber-300"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2 flex gap-1">
              <span className="uppercase font-semibold text-white bg-gray-600 text-sm px-2 text-center flex items-center justify-center">
                Faction
              </span>
              <span className="font-semibold text-gray-600 text-sm px-2">{active.faction}</span>
            </div>
            <div className="w-1/2 flex gap-1">
              <span className="uppercase font-semibold text-white bg-gray-600 text-sm px-2 text-center flex items-center justify-center">
                Race
              </span>
              <span className="font-semibold text-gray-600 text-sm px-2">{active.race ?? '[data_missing]'}</span>
            </div>
          </div>
          <div
            className="h-40 mt-3 w-full overflow-hidden overflow-y-scroll"
            // style={{ boxShadow: `inset 0px 50px 36px -28px #ebe6e7, inset 0px -50px 36px -28px #ebe6e7` }}
          >
            {active.description}
          </div>
          <div className="relative h-16">
            <button
              onClick={handlePrev}
              className="absolute -left-15 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-500 p-3 rounded-full cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </button>
            <div {...handlers} className="flex items-center gap-2 h-16">
              {opList.slice(position, position + 3).map((x) => (
                <div key={x.index} className="w-40 h-16 gap-1.5 relative cursor-pointer" onClick={() => setActive(x)}>
                  {active.index !== x.index && (
                    <div className="w-full h-full absolute top-0 left-0 bg-gray-700/50 flex flex-col justify-center hover:bg-amber-300/75 text-white hover:text-black transform transition-all duration-300">
                      <span className="text-3xl font-bold mx-2 leading-8">{x.index}</span>
                      <span className="text-md font-medium mx-2 leading-4">{x.name}</span>
                    </div>
                  )}
                  <img
                    src={x.ava}
                    alt="ava"
                    className={cn('w-full h-full object-cover bg-black', { 'bg-amber-300': active.index === x.index })}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="absolute -right-15 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-500 p-3 rounded-full cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </button>
          </div>
        </div>
      </div>
      <div className="text-gray-300 absolute font-extrabold text-[8rem] h-28 leading-28 left-46 mb-55">
        {active.name}
      </div>
      <div className="w-5xl h-[120%] absolute right-0 -mx-35">
        <img src={active.char} alt="char" className="w-full h-full object-center" />
      </div>
      {/* Video and Canvas */}
      {/* {active?.vid && (
        <div className="absolute top-0 left-0 w-full h-full">
          <video ref={videoRef} autoPlay loop muted src={active.vid} className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      )} */}
    </div>
  );
};

export default Operators;
