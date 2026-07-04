import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";




const portfolioItems = [
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/-HDLivaU1J4",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/uKdR1VuvQ1w?feature=share",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/-CQQnR-5Nl8?feature=share",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/e3xKvjilzKs?feature=share",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/AzaLm4jCyeg?feature=share",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/0nZxiYB3oTI?feature=share",
  },
  {
    category: "PERSONAL BRANDING",
    youtube: "https://youtube.com/shorts/1H7a8WU1pjE?feature=share",
  },
];

const getYoutubeId = (url) => {
  const reg =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&]+)/;

  const match = url.match(reg);

  return match ? match[1] : null;
};

export default function FeaturedPortfolio() {
  const swiperRef = useRef(null);
  const players = useRef({});
  const [muted, setMuted] = useState({});

  useEffect(() => {
    const loadPlayer = () => {
      portfolioItems.forEach((item, index) => {
        const videoId = getYoutubeId(item.youtube);

        players.current[index] = new window.YT.Player(`yt-player-${index}`, {
          videoId,

          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,

            rel: 0,
            fs: 0,
            disablekb: 1,
            iv_load_policy: 3,
            modestbranding: 1,

            enablejsapi: 1,
            origin: window.location.origin,
          },

          events: {
            onReady: (event) => {
              event.target.mute();
              event.target.playVideo();

              setMuted((prev) => ({
                ...prev,
                [index]: true,
              }));

              setInterval(() => {
                const state = event.target.getPlayerState();

                if (state !== window.YT.PlayerState.PLAYING) {
                  event.target.playVideo();
                }
              }, 2000);
            },
          },
        });
      });
    };

    if (window.YT && window.YT.Player) {
      loadPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      window.onYouTubeIframeAPIReady = loadPlayer;
    }
  }, []);

  const toggleMute = (index) => {
    const player = players.current[index];

    if (!player) return;

    if (muted[index]) {
      player.unMute();
    } else {
      player.mute();
    }

    setMuted((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      id="featured-portfolio"
      className="bg-black py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-white mb-4">
          Featured Work
        </h2>

        <p className="text-center text-gray-400 mb-14">
          See what we've created for our clients
        </p>

<div className="sticky top-0 h-screen flex items-center">
<Swiper
  modules={[Autoplay, FreeMode, Mousewheel]}
  loop
  freeMode
  grabCursor
  allowTouchMove
  speed={6000}
  mousewheel={{
    forceToAxis: true,
    sensitivity: 1,
  }}
  autoplay={{
  delay: 0,
  disableOnInteraction: false,
  pauseOnMouseEnter: false,
  waitForTransition: false,
}}
  spaceBetween={24}
  slidesPerView={1.2}
  breakpoints={{
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  }}
>


  {portfolioItems.map((item, index) => (
    <SwiperSlide className="!w-[280px]" key={index}>
      <div className="relative rounded-3xl overflow-hidden border border-gray-700 bg-black">
        <div className="relative aspect-[9/16] overflow-hidden">

          <div
            id={`yt-player-${index}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />

          <button
            onClick={() => toggleMute(index)}
            className="absolute top-4 right-4 z-30
                       flex h-11 w-11 items-center justify-center
                       rounded-full
                       bg-black/50
                       backdrop-blur-md
                       border border-white/10
                       transition-all duration-300
                       hover:bg-black/70"
          >
            {muted[index] ? (
              <SpeakerXMarkIcon className="h-5 w-5 text-white" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5 text-white" />
            )}
          </button>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
            <p className="text-[10px] uppercase tracking-[3px] text-gray-300">
              {item.category}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-white">
              {item.title}
            </h3>
          </div>

        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
 </div>

      </div>
    </section>
  );
}