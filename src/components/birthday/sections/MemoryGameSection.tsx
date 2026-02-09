import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { PartyPopper, ArrowRight, RotateCcw } from 'lucide-react';

const EMOJIS = ['🌸', '🦋', '🌈', '🎀', '⭐', '💝'];

interface Props {
  onNext: () => void;
}

const MemoryGameSection = ({ onNext }: Props) => {
  const { x, y } = useMouseParallax(8);
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const initGame = useCallback(() => {
    const shuffled = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(() => setIsComplete(true), 500);
    }
  }, [matched.length, cards.length]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (isChecking || flipped.includes(index) || matched.includes(index)) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setAttempts((prev) => prev + 1);
        setIsChecking(true);

        if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
          setMatched((prev) => [...prev, ...newFlipped]);
          setFlipped([]);
          setIsChecking(false);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 800);
        }
      }
    },
    [isChecking, flipped, matched, cards]
  );

  const isCardVisible = (index: number) =>
    flipped.includes(index) || matched.includes(index);

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-sky-soft via-background to-lavender transition-transform duration-300"
        style={{ transform: `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)` }}
      />

      {/* Floating decorations */}
      <motion.span
        className="absolute top-[10%] left-[8%] text-3xl pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🎈
      </motion.span>
      <motion.span
        className="absolute top-[15%] right-[12%] text-2xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        🎉
      </motion.span>
      <motion.span
        className="absolute bottom-[15%] left-[15%] text-2xl pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🌟
      </motion.span>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-script text-primary">Mini Game</h2>
          <p className="text-muted-foreground mt-2 font-body">
            Temukan pasangan yang cocok!
          </p>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground font-body">
            <span>Percobaan: {attempts}</span>
            <span>
              Ditemukan: {matched.length / 2} / {EMOJIS.length}
            </span>
          </div>
        </motion.div>

        {/* Game Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-4 gap-3 md:gap-4"
        >
          {cards.map((emoji, index) => (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-xl text-2xl md:text-3xl flex items-center justify-center transition-all duration-300 ${
                matched.includes(index)
                  ? 'bg-primary/20 border-2 border-primary/40 shadow-md'
                  : isCardVisible(index)
                  ? 'bg-card border-2 border-primary/30 shadow-lg'
                  : 'bg-card/80 border-2 border-border hover:border-primary/40 hover:shadow-md cursor-pointer'
              }`}
              whileHover={
                !isCardVisible(index) && !isChecking ? { scale: 1.05 } : undefined
              }
              whileTap={
                !isCardVisible(index) && !isChecking ? { scale: 0.95 } : undefined
              }
            >
              <AnimatePresence mode="wait">
                {isCardVisible(index) ? (
                  <motion.span
                    key="emoji"
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ) : (
                  <motion.span
                    key="back"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary/30 text-lg"
                  >
                    ✦
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <button
            onClick={initGame}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
          >
            <RotateCcw className="w-4 h-4" />
            Mulai ulang
          </button>
        </motion.div>
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="glass rounded-3xl p-8 text-center max-w-sm mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <PartyPopper className="w-16 h-16 text-gold-shimmer mx-auto" />
              </motion.div>
              <h3 className="mt-4 text-2xl font-script text-primary">Luar Biasa!</h3>
              <p className="mt-2 text-muted-foreground font-body">
                Kamu menyelesaikannya dalam {attempts} percobaan! 🎉
              </p>
              <button
                onClick={onNext}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Lanjutkan
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoryGameSection;
