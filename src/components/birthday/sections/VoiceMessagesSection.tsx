import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { Play, Pause, SkipForward, SkipBack, Mic, ArrowRight } from 'lucide-react';

const RECORDINGS = [
  { id: 1, title: 'Kenangan Masa Kecil', description: 'Cerita tentang masa kecil kita bersama', src: '/audio/recording-1.mp3' },
  { id: 2, title: 'Permintaan Maaf', description: 'Hal-hal yang ingin kusampaikan', src: '/audio/recording-2.mp3' },
  { id: 3, title: 'Ucapan Terima Kasih', description: 'Untuk semua yang telah kamu berikan', src: '/audio/recording-3.mp3' },
  { id: 4, title: 'Harapan Masa Depan', description: 'Doa dan harapanku untukmu', src: '/audio/recording-4.mp3' },
  { id: 5, title: 'Cerita Lucu', description: 'Momen konyol yang tak terlupakan', src: '/audio/recording-5.mp3' },
  { id: 6, title: 'Pesan Terakhir', description: 'Kata-kata dari lubuk hati terdalam', src: '/audio/recording-6.mp3' },
];

interface Props {
  onNext: () => void;
  bgAudioRef?: React.RefObject<HTMLAudioElement>;
}

const VoiceMessagesSection = ({ onNext, bgAudioRef }: Props) => {
  const { x, y } = useMouseParallax(8);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animFrameRef = useRef<number>(0);

  const active = RECORDINGS[activeIndex];

  // Lower background music volume on mount, restore on unmount
  useEffect(() => {
    if (bgAudioRef?.current) {
      bgAudioRef.current.volume = 0.7;
    }
    return () => {
      if (bgAudioRef?.current) {
        bgAudioRef.current.volume = 1;
      }
    };
  }, [bgAudioRef]);

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      if (!audioRef.current.paused) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }
  };

  const handlePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      animFrameRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelect = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
    }
    setActiveIndex(index);
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
  };

  const handlePrev = () => handleSelect(Math.max(0, activeIndex - 1));
  const handleNext = () => handleSelect(Math.min(RECORDINGS.length - 1, activeIndex + 1));

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    cancelAnimationFrame(animFrameRef.current);
    if (activeIndex < RECORDINGS.length - 1) {
      handleSelect(activeIndex + 1);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cream-warm to-sky-soft/20 transition-transform duration-300"
        style={{ transform: `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)` }}
      />
      <div className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-sunset-warm/10 blur-3xl" />

      <audio
        ref={audioRef}
        src={active.src}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <div className="flex justify-center mb-4">
            <Mic className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-script text-primary text-center mb-6">
            Pesan Suara
          </h2>

          {/* Now Playing */}
          <div className="text-center mb-4">
            <p className="font-display font-semibold text-foreground text-lg">{active.title}</p>
            <p className="text-sm text-muted-foreground font-body">{active.description}</p>
          </div>

          {/* Waveform visual */}
          <div className="flex items-center justify-center gap-[3px] h-12 mb-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-primary/60"
                animate={{
                  height: isPlaying ? [8, 20 + Math.random() * 20, 8] : 8,
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          {/* Seek bar */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-muted-foreground font-body w-10 text-right">{formatTime(progress)}</span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1.5 rounded-full appearance-none bg-secondary cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
            <span className="text-xs text-muted-foreground font-body w-10">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-30"
            >
              <SkipBack className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handlePlay}
              className="p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === RECORDINGS.length - 1}
              className="p-2 rounded-full hover:bg-accent transition-colors disabled:opacity-30"
            >
              <SkipForward className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Track list */}
          <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin">
            {RECORDINGS.map((rec, i) => (
              <button
                key={rec.id}
                onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all font-body text-sm ${
                  i === activeIndex
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'hover:bg-accent/50 text-foreground/70'
                }`}
              >
                <span className="w-5 text-center text-xs text-muted-foreground">{i + 1}</span>
                <span className="flex-1 truncate">{rec.title}</span>
              </button>
            ))}
          </div>

          {/* Next button */}
          <div className="mt-6 flex justify-end">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onNext}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Lanjutkan
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceMessagesSection;
