import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { ArrowRight, Heart } from 'lucide-react';

const MESSAGE = `Kakakku yang tersayang,

Terima kasih telah menjadi bagian terindah dalam hidupku. Setiap momen bersamamu adalah kenangan yang tak ternilai harganya.

Di hari spesialmu ini, aku ingin kamu tahu betapa berharganya dirimu. Kamu selalu menjadi inspirasi, pelindung, dan sahabat terbaikku.

Semoga tahun ini membawa lebih banyak kebahagiaan, cinta, dan mimpi yang terwujud untukmu.

Dengan sepenuh hati,
Adikmu ❤️`;

interface Props {
  onNext: () => void;
}

const MessageSection = ({ onNext }: Props) => {
  const { x, y } = useMouseParallax(8);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (displayedText.length < MESSAGE.length) {
      const timer = setTimeout(() => {
        setDisplayedText(MESSAGE.slice(0, displayedText.length + 1));
      }, 35);
      return () => clearTimeout(timer);
    } else {
      setIsTypingDone(true);
    }
  }, [displayedText]);

  const skipTyping = () => {
    setDisplayedText(MESSAGE);
    setIsTypingDone(true);
  };

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-sunset-warm/20 via-cream-warm to-background transition-transform duration-300"
        style={{ transform: `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)` }}
      />

      {/* Decorative blurs */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-sunset-warm/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex justify-center mb-6">
            <Heart className="w-8 h-8 text-primary" fill="currentColor" />
          </div>

          <h2 className="text-3xl md:text-4xl font-script text-primary text-center mb-8">
            Pesan dari Hati
          </h2>

          {/* Typing message */}
          <div className="min-h-[200px] font-body text-foreground/90 text-base md:text-lg leading-relaxed whitespace-pre-line">
            {displayedText}
            {!isTypingDone && (
              <span className="inline-block w-0.5 h-5 bg-primary animate-pulse ml-0.5 align-middle" />
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between">
            {!isTypingDone ? (
              <button
                onClick={skipTyping}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
              >
                Lewati animasi →
              </button>
            ) : (
              <div />
            )}
            {isTypingDone && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onNext}
                className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;
