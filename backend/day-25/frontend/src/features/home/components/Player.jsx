import { useContext, useEffect, useRef, useState } from "react";
import {
  Gauge,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";
import "../style/player.scss";
import useSong from "../hook/useSong";

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song?.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      audio.duration || Number.MAX_SAFE_INTEGER,
    );
    setCurrentTime(audio.currentTime);
  };

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value);
    if (audioRef.current) audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isMuted = volume === 0;

  return (
    <section className="player" aria-label="Music player">
      <audio
        ref={audioRef}
        src={song?.url}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player__inner">
        <div className="player__song">
          <img src={song?.posterUrl} alt="" className="player__artwork" />
          <div className="player__details">
            <span className="player__eyebrow">Now playing</span>
            <strong>{song?.title || "No song selected"}</strong>
            <span>{song?.mood || "Moodify collection"}</span>
          </div>
        </div>

        <div className="player__controls">
          <div className="player__transport">
            <button type="button" onClick={() => skip(-10)} aria-label="Rewind 10 seconds" title="Rewind 10 seconds">
              <RotateCcw size={17} />
            </button>
            <button type="button" className="player__play" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
            </button>
            <button type="button" onClick={() => skip(10)} aria-label="Forward 10 seconds" title="Forward 10 seconds">
              <RotateCw size={17} />
            </button>
          </div>
          <div className="player__timeline">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={handleSeek}
              aria-label="Song progress"
              style={{ "--progress": `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player__options">
          <label className="player__speed">
            <Gauge size={16} />
            <span className="sr-only">Playback speed</span>
            <select value={playbackRate} onChange={(event) => setPlaybackRate(Number(event.target.value))}>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
          </label>
          <button type="button" onClick={() => setVolume(isMuted ? 0.8 : 0)} aria-label={isMuted ? "Unmute" : "Mute"} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input className="player__volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" />
        </div>
      </div>
    </section>
  );
};

export default Player;
