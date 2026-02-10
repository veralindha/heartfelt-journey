import { useState, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import OpeningSection from './sections/OpeningSection';
import MemoryGameSection from './sections/MemoryGameSection';
import QuestionsSection from './sections/QuestionsSection';
import MessageSection from './sections/MessageSection';
import GallerySection from './sections/GallerySection';
import VoiceMessagesSection from './sections/VoiceMessagesSection';
import ClosingSection from './sections/ClosingSection';

const JOURNEY_SECTIONS = [
  { id: 'minigame', label: 'Mini Game' },
  { id: 'questions', label: 'Refleksi' },
  { id: 'message', label: 'Pesan Hati' },
  { id: 'gallery', label: 'Kenangan' },
  { id: 'voicemessages', label: 'Pesan Suara' },
  { id: 'closing', label: 'Penutup' },
];

const BirthdayApp = () => {
  const [phase, setPhase] = useState<'opening' | 'journey'>('opening');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const audioRef = useRef<HTMLAudioElement>(null);

  const goNext = useCallback(() => {
    setSectionIndex((prev) => Math.min(prev + 1, JOURNEY_SECTIONS.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setSectionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSection = useCallback((index: number) => {
    setSectionIndex(Math.max(0, Math.min(index, JOURNEY_SECTIONS.length - 1)));
  }, []);

  const handleStart = useCallback(() => {
    setPhase('journey');
    setSectionIndex(0);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsMusicPlaying((prev) => !prev);
    }
  }, [isMusicPlaying]);

  const saveAnswer = useCallback((question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  }, []);

  const renderSection = () => {
    switch (sectionIndex) {
      case 0:
        return <MemoryGameSection onNext={goNext} />;
      case 1:
        return <QuestionsSection onNext={goNext} onSaveAnswer={saveAnswer} />;
      case 2:
        return <MessageSection onNext={goNext} />;
      case 3:
        return <GallerySection onNext={goNext} />;
      case 4:
        return <VoiceMessagesSection onNext={goNext} bgAudioRef={audioRef} />;
      case 5:
        return <ClosingSection answers={answers} />;
      default:
        return null;
    }
  };

  const isJourney = phase === 'journey';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background font-body">
      <audio ref={audioRef} loop preload="none">
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      {isJourney && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleMusic}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg hover:scale-110 transition-transform duration-300"
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-5 h-5 text-primary" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      )}

      {/* Navigation Dots */}
      {isJourney && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-md border border-border/30"
        >
          {JOURNEY_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              onClick={() => goToSection(index)}
              className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === sectionIndex
                  ? 'bg-primary scale-125 shadow-sm shadow-primary/50'
                  : index < sectionIndex
                  ? 'bg-primary/50'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={section.label}
            />
          ))}
        </motion.div>
      )}

      {/* Navigation Arrows */}
      {isJourney && sectionIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goPrev}
          className="fixed left-4 top-6 z-50 p-3 rounded-full bg-card/60 backdrop-blur-md border border-border/30 shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
      )}
      {isJourney && sectionIndex < JOURNEY_SECTIONS.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goNext}
          className="fixed right-14 top-6 z-50 p-3 rounded-full bg-card/60 backdrop-blur-md border border-border/30 shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </motion.button>
      )}

      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isJourney ? `s-${sectionIndex}` : 'opening'}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          {isJourney ? renderSection() : <OpeningSection onStart={handleStart} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BirthdayApp;
