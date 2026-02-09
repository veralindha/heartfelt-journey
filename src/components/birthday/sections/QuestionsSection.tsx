import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { ArrowRight, MessageCircleHeart, PenLine } from 'lucide-react';

const QUESTIONS = [
  {
    question: 'Apa momen paling bahagia tahun ini?',
    icon: '✨',
    placeholder: 'Ceritakan momen indahmu...',
  },
  {
    question: 'Siapa orang yang selalu kamu syukuri?',
    icon: '💕',
    placeholder: 'Tuliskan nama dan alasannya...',
  },
  {
    question: 'Apa mimpi terbesarmu?',
    icon: '🌟',
    placeholder: 'Bagikan mimpimu di sini...',
  },
];

interface Props {
  onNext: () => void;
  onSaveAnswer: (question: string, answer: string) => void;
}

const QuestionsSection = ({ onNext, onSaveAnswer }: Props) => {
  const { x, y } = useMouseParallax(10);
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSaveAnswer(QUESTIONS[currentQ].question, answer);
    }

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setAnswer('');
    } else {
      setIsComplete(true);
    }
  };

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent/30 via-background to-primary/10 transition-transform duration-300"
        style={{ transform: `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)` }}
      />

      {/* Decorative blur circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 md:p-10"
            >
              {/* Window header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary/40" />
                  <span className="w-3 h-3 rounded-full bg-gold-shimmer/40" />
                  <span className="w-3 h-3 rounded-full bg-secondary/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-body">
                  Pertanyaan {currentQ + 1} dari {QUESTIONS.length}
                </span>
              </div>

              {/* Question */}
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">{QUESTIONS[currentQ].icon}</span>
                <h3 className="text-xl md:text-2xl font-display text-foreground leading-relaxed">
                  {QUESTIONS[currentQ].question}
                </h3>
              </div>

              {/* Answer input */}
              <div className="relative">
                <PenLine className="absolute top-4 left-4 w-4 h-4 text-muted-foreground" />
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder={QUESTIONS[currentQ].placeholder}
                  className="w-full min-h-[120px] p-4 pl-10 rounded-2xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 resize-none font-body transition-all"
                />
              </div>

              {/* Submit */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-md hover:scale-105 transition-transform"
                >
                  {currentQ < QUESTIONS.length - 1 ? 'Selanjutnya' : 'Selesai'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-6">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentQ
                        ? 'bg-primary scale-125'
                        : i < currentQ
                        ? 'bg-primary/50'
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 md:p-10 text-center"
            >
              <MessageCircleHeart className="w-16 h-16 text-primary mx-auto" />
              <h3 className="mt-4 text-2xl font-script text-primary">Terima Kasih</h3>
              <p className="mt-2 text-muted-foreground font-body">
                Jawaban-jawabanmu tersimpan sebagai kenangan indah 💕
              </p>
              <button
                onClick={onNext}
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Lanjutkan Perjalanan
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuestionsSection;
