import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { Sparkles, Download, Heart } from 'lucide-react';
import { toast } from 'sonner';
import closingBg from '@/assets/closing-bg.jpg';

interface Props {
  answers: Record<string, string>;
}

const Particle = ({
  delay,
  size,
  left,
  top,
}: {
  delay: number;
  size: number;
  left: string;
  top: string;
}) => (
  <motion.div
    className="absolute rounded-full bg-gold-shimmer/50"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 0.5],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

const ClosingSection = ({ answers }: Props) => {
  const { x, y } = useMouseParallax(10);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveMemory = () => {
    const memory = {
      date: new Date().toISOString(),
      answers,
      quote:
        'Setiap hari adalah halaman baru dalam kisah hidupmu. Tulislah yang indah.',
    };
    localStorage.setItem('birthday-memory', JSON.stringify(memory));
    toast.success('Kenangan tersimpan! 💕', {
      description: 'Momen indah ini telah disimpan untukmu.',
    });
  };

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-[-20px] bg-cover bg-center transition-transform duration-300"
        style={{
          backgroundImage: `url(${closingBg})`,
          transform: `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/50" />

      {/* Light particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.3}
          size={2 + Math.random() * 4}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
        />
      ))}

      {/* Content */}
      {showContent && (
        <div className="relative z-10 text-center max-w-lg px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Sparkles className="w-10 h-10 text-gold-shimmer mx-auto" />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-2xl md:text-3xl font-script text-primary-foreground leading-relaxed">
              &ldquo;Setiap hari adalah halaman baru dalam kisah hidupmu.
              Tulislah yang indah.&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-12 bg-primary-foreground/30" />
            <Heart className="w-4 h-4 text-rose-glow" fill="currentColor" />
            <span className="h-px w-12 bg-primary-foreground/30" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-primary-foreground/80 font-display italic text-lg"
          >
            Dengan cinta, Adikmu
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10"
          >
            <button
              onClick={handleSaveMemory}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card/20 backdrop-blur-md text-primary-foreground border border-primary-foreground/20 font-body font-semibold text-lg shadow-lg hover:bg-card/30 hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Simpan Kenangan
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-6 text-sm text-primary-foreground/50 font-body"
          >
            Dibuat dengan ❤️ untukmu
          </motion.p>
        </div>
      )}
    </section>
  );
};

export default ClosingSection;
