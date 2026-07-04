import { useEffect, useRef, useState, useCallback } from "react";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlayIcon,
  PauseIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const portfolioItems = [
  { category: "PERSONAL BRANDING", title: "Talking Head Reel", youtube: "https://youtube.com/shorts/-HDLivaU1J4" },
    { category: "PERSONAL BRANDING", title: "Reel Shoot and Edit", youtube: "https://youtube.com/shorts/0nZxiYB3oTI?feature=share" },
  { category: "PERSONAL BRANDING", title: "Promotional Reel - Shoot and Edit", youtube: "https://youtube.com/shorts/uKdR1VuvQ1w?feature=share" },
  { category: "PERSONAL BRANDING", title: "Talking Head Reel - Shoot and Edit", youtube: "https://youtube.com/shorts/-CQQnR-5Nl8?feature=share" },
  { category: "PERSONAL BRANDING", title: "Talking Head Reel", youtube: "https://youtube.com/shorts/e3xKvjilzKs?feature=share" },
  { category: "PERSONAL BRANDING", title: "Reel Shoot and Edit", youtube: "https://youtube.com/shorts/AzaLm4jCyeg?feature=share" },
  { category: "PERSONAL BRANDING", title: "Reel Complete Video with AI", youtube: "https://youtube.com/shorts/1H7a8WU1pjE?feature=share" },
];

const getYoutubeId = (url) => {
  const reg = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&]+)/;
  const match = url.match(reg);
  return match ? match[1] : null;
};

function ensureYouTubeApi(onReady) {
  if (window.YT && window.YT.Player) {
    onReady();
    return;
  }
  const prevCallback = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    prevCallback?.();
    onReady();
  };
  if (!document.getElementById("youtube-iframe-api")) {
    const tag = document.createElement("script");
    tag.id = "youtube-iframe-api";
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}

/* ----------------------------------------------------------------
   Grid card: silent, always-playing background video, no controls.
------------------------------------------------------------------- */
function PortfolioCard({ item, index, onOpen }) {
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;

    ensureYouTubeApi(() => {
      if (destroyed) return;
      const videoId = getYoutubeId(item.youtube);
      if (!videoId) return;

      playerRef.current = new window.YT.Player(`yt-grid-${index}`, {
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
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
            setReady(true);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED || e.data === window.YT.PlayerState.PAUSED) {
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      try {
        playerRef.current?.destroy?.();
      } catch (e) {
        /* ignore */
      }
    };
  }, [index, item.youtube]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-gray-700 bg-black cursor-pointer group"
      onClick={() => onOpen(index)}
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div id={`yt-grid-${index}`} className="w-full h-full" />
        </div>

        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <div className="h-14 w-14 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all scale-90 group-hover:scale-100">
            <PlayIcon className="h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
  <p className="text-[10px] uppercase tracking-[3px] text-gray-300">
    {item.category}
  </p>
  <h3 className="mt-1 text-lg font-bold text-white">
    {item.title}
  </h3>
</div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Modal player: full controls - play/pause, mute + drag volume,
   and a clearly visible click/drag seek bar.
------------------------------------------------------------------- */
function VideoModal({ item, onClose }) {
  const playerRef = useRef(null);
  const trackRef = useRef(null);
  const volumeTrackRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [draggingVolume, setDraggingVolume] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);

  const progressInterval = useRef(null);
  const volumeCloseTimer = useRef(null);

  useEffect(() => {
    let destroyed = false;

    ensureYouTubeApi(() => {
      if (destroyed) return;
      const videoId = getYoutubeId(item.youtube);
      if (!videoId) return;

      playerRef.current = new window.YT.Player("yt-modal-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 0,
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
          onReady: (e) => {
            e.target.playVideo();
            setReady(true);
            setDuration(e.target.getDuration());
            setPlaying(true);
            setMuted(e.target.isMuted());
            setVolume(e.target.getVolume());

            progressInterval.current = setInterval(() => {
              setDragging((isDragging) => {
                if (!isDragging) {
                  const dur = e.target.getDuration();
                  const current = e.target.getCurrentTime();
                  if (dur > 0) {
                    setProgress((current / dur) * 100);
                  }
                }
                return isDragging;
              });
            }, 500);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setPlaying(true);
            if (e.data === window.YT.PlayerState.PAUSED) setPlaying(false);
          },
        },
      });
    });

    return () => {
      destroyed = true;
      clearInterval(progressInterval.current);
      clearTimeout(volumeCloseTimer.current);
      try {
        playerRef.current?.destroy?.();
      } catch (e) {
        /* ignore */
      }
    };
  }, [item.youtube]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      setMuted(false);
      if (volume === 0) {
        player.setVolume(50);
        setVolume(50);
      }
    } else {
      player.mute();
      setMuted(true);
    }
  };

  /* ---------- Seek bar ---------- */

  const percentFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(1, Math.max(0, ratio)) * 100;
  }, []);

  const seekTo = useCallback(
    (percent) => {
      const player = playerRef.current;
      if (!player || !duration) return;
      player.seekTo((percent / 100) * duration, true);
    },
    [duration]
  );

  const handleSeekPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const percent = percentFromClientX(e.clientX);
    setDragging(true);
    setProgress(percent);
    seekTo(percent);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const percent = percentFromClientX(e.clientX);
      setProgress(percent);
      seekTo(percent);
    };
    const handleUp = () => setDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, percentFromClientX, seekTo]);

  /* ---------- Volume slider ---------- */

  const applyVolume = useCallback((vol) => {
    const player = playerRef.current;
    if (!player) return;
    const clamped = Math.min(100, Math.max(0, vol));
    player.setVolume(clamped);
    setVolume(clamped);
    if (clamped === 0) {
      player.mute();
      setMuted(true);
    } else if (muted) {
      player.unMute();
      setMuted(false);
    }
  }, [muted]);

  // vertical slider: top = 100%, bottom = 0%
  const volumeFromClientY = useCallback((clientY) => {
    const track = volumeTrackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const ratio = (rect.bottom - clientY) / rect.height;
    return Math.min(1, Math.max(0, ratio)) * 100;
  }, []);

  const handleVolumePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const vol = volumeFromClientY(e.clientY);
    setDraggingVolume(true);
    applyVolume(vol);
  };

  useEffect(() => {
    if (!draggingVolume) return;

    const handleMove = (e) => {
      const vol = volumeFromClientY(e.clientY);
      applyVolume(vol);
    };
    const handleUp = () => setDraggingVolume(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [draggingVolume, volumeFromClientY, applyVolume]);

  const openVolume = () => {
    clearTimeout(volumeCloseTimer.current);
    setVolumeOpen(true);
  };

  const scheduleCloseVolume = () => {
    clearTimeout(volumeCloseTimer.current);
    volumeCloseTimer.current = setTimeout(() => setVolumeOpen(false), 250);
  };

  const displayVolume = muted ? 0 : volume;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] max-w-[380px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="h-8 w-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 flex h-10 w-10 items-center justify-center
                     rounded-full bg-black/50 backdrop-blur-md border border-white/10
                     hover:bg-black/70 transition-all"
        >
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>

        <div className="absolute inset-0 pointer-events-none">
          <div id="yt-modal-player" className="w-full h-full" />
        </div>

        <div className="absolute inset-0 z-20" onClick={togglePlay} />

        {!playing && ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="h-16 w-16 rounded-full bg-black/50 flex items-center justify-center">
              <PlayIcon className="h-7 w-7 text-white" />
            </div>
          </div>
        )}

{/* Speaker icon + hover-reveal horizontal volume slider */}
<div
  style={{
    position: "absolute",
    top: "16px",
    left: "16px",
    zIndex: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }}
  onMouseEnter={openVolume}
  onMouseLeave={scheduleCloseVolume}
>
  <button
    onClick={(e) => {
      e.stopPropagation();
      toggleMute();
    }}
    style={{
      display: "flex",
      height: "40px",
      width: "40px",
      flexShrink: 0,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px",
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}
  >
    {muted || volume === 0 ? (
      <SpeakerXMarkIcon className="h-5 w-5 text-white" />
    ) : (
      <SpeakerWaveIcon className="h-5 w-5 text-white" />
    )}
  </button>

  {(volumeOpen || draggingVolume) && (
    <div
      style={{
        marginLeft: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(6px)",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "0 14px",
        height: "40px",
      }}
      onMouseEnter={openVolume}
      onMouseLeave={scheduleCloseVolume}
    >
      <div
        ref={volumeTrackRef}
        onPointerDown={handleVolumePointerDown}
        style={{
          position: "relative",
          width: "96px",
          height: "24px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "rgba(255,255,255,0.25)",
            borderRadius: "9999px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              height: "4px",
              background: "#fff",
              borderRadius: "9999px",
              width: `${displayVolume}%`,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
            left: `calc(${displayVolume}% - 6px)`,
            transform: "translateY(-50%)",
          }}
        />
      </div>

      <span
        style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.8)",
          marginLeft: "10px",
          userSelect: "none",
          minWidth: "18px",
          textAlign: "right",
        }}
      >
        {Math.round(displayVolume)}
      </span>
    </div>
  )}
</div>

        {/* Bottom bar: seek bar + category */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div
            ref={trackRef}
            onPointerDown={handleSeekPointerDown}
            className="relative w-full h-7 flex items-center cursor-pointer group touch-none px-0"
          >
            <div className="relative w-full h-[5px] bg-white/30 rounded-full overflow-visible">
              <div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{
                  width: `${progress}%`,
                  transition: dragging ? "none" : "width 0.3s",
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white
                           shadow-[0_0_0_3px_rgba(0,0,0,0.4)]"
                style={{
                  left: `${progress}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 pt-1 bg-gradient-to-t from-black via-black/70 to-transparent">
            <p className="text-[10px] uppercase tracking-[3px] text-gray-300">
              {item.category}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full
                         bg-white/10 hover:bg-white/20 transition-all"
            >
              {playing ? (
                <PauseIcon className="h-4 w-4 text-white" />
              ) : (
                <PlayIcon className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export default function FeaturedPortfolio() {

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="featured-portfolio" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-white mb-4">
          Featured Work
        </h2>

        <p className="text-center text-gray-400 mb-10">
          See what we've created for our clients
        </p>

        <div className="flex items-center">
          <Swiper
            modules={[Autoplay, FreeMode, Mousewheel]}
            loop
            freeMode
            grabCursor
            allowTouchMove
            speed={6000}
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
              waitForTransition: false,
            }}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide className="!w-[280px]" key={index}>
                <PortfolioCard item={item} index={index} onOpen={setActiveIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {activeIndex !== null && (
        <VideoModal
          item={portfolioItems[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}