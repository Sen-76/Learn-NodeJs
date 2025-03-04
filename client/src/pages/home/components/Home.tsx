import { Button, Model } from '@/common/components';
import Auth from '@/layouts/Auth';
import { faDiscord, faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeDiv = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rightNav = '80px';
  return (
    <div className="w-full h-full">
      <video autoPlay loop muted className="w-screen h-screen object-cover absolute">
        <source
          src="https://web-static.hg-cdn.com/endfield/official-v3/assets/videos/home_pc_en_us_0tGzNpwXVtOGUGcz.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute h-full right-0 bg-gray-500/25" style={{ width: rightNav }}>
        <div className="h-full w-full flex items-center justify-center flex-col text-white text-[24px] gap-6">
          <Link to="https://twitter.com/AKEndfield" target="blank">
            <FontAwesomeIcon icon={faXTwitter} />
          </Link>
          <Link to="https://www.facebook.com/ArknightsEndfield" target="blank">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link to="https://www.youtube.com/channel/UCowPaVRBzg8CE6K4CB6LJfw" target="blank">
            <FontAwesomeIcon icon={faYoutube} />
          </Link>
          <Link to="https://www.instagram.com/akendfieldofficial/" target="blank">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link to="https://discord.gg/akendfield" target="blank">
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
        </div>
      </div>
      <div className="relative top-3/4" style={{ left: `calc(50% - ${rightNav})` }}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-48 bg-yellow-400 rounded-full text-gray-700 font-semibold text-[18px] border-2 border-red-900/50 outline-2 outline-red-500/25 hover:bg-gray-400/25 hover:text-yellow-300 hover:border-gray-600/25"
        >
          SIGN UP
        </Button>
      </div>
      <Model open={isOpen} setIsOpen={setIsOpen}>
        <Auth />
      </Model>
    </div>
  );
};

export default HomeDiv;
