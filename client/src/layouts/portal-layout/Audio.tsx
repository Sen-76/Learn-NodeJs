import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Audio = () => {
  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-2 text-white px-3 py-2">
        <div className="hidden md:block cursor-pointer">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
      </div>
      <audio autoPlay loop hidden>
        <source src="path-to-your-audio-file.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Audio;
