import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { Heart, Sparkles, Star } from 'lucide-react';
import openingBg from '@/assets/opening-bg.jpg';

interface Props {
  onStart: () => void;
}

const FloatingElement = ({
  children,
  delay,
  duration,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className?: string;
}) => (
  <motion.div
    className={`absolute pointer-events-none ${className}`}
    animate={{
      y: [0, -25, 0],
      opacity: [0.2, 0.7, 0.2],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

const OpeningSection = ({ onStart }: Props) => {
  const { x, y } = useMouseParallax(12);

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div
        className="absolute inset-[-20px] bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${openingBg})`,
          transform: `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/70" />

      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={5} className="top-[10%] left-[15%]">
        <Heart className="w-6 h-6 text-primary" fill="currentColor" />
      </FloatingElement>
      <FloatingElement delay={1} duration={6} className="top-[20%] right-[20%]">
        <Star className="w-5 h-5 text-gold-shimmer" fill="currentColor" />
      </FloatingElement>
      <FloatingElement delay={0.5} duration={4.5} className="bottom-[30%] left-[10%]">
        <Sparkles className="w-4 h-4 text-accent" />
      </FloatingElement>
      <FloatingElement delay={1.5} duration={5.5} className="top-[40%] right-[10%]">
        <span className="text-2xl">🌸</span>
      </FloatingElement>
      <FloatingElement delay={2} duration={7} className="bottom-[20%] right-[25%]">
        <Heart className="w-4 h-4 text-rose-glow" fill="currentColor" />
      </FloatingElement>
      <FloatingElement delay={0.8} duration={6.5} className="top-[60%] left-[25%]">
        <span className="text-xl">✿</span>
      </FloatingElement>
      <FloatingElement delay={1.2} duration={5} className="top-[15%] left-[50%]">
        <Star className="w-3 h-3 text-gold-shimmer" fill="currentColor" />
      </FloatingElement>
      <FloatingElement delay={2.5} duration={4} className="bottom-[40%] right-[15%]">
        <span className="text-lg">🦋</span>
      </FloatingElement>

      {/* Content with parallax */}
      <div
        className="relative z-10 text-center px-6 max-w-lg"
        style={{
          transform: `translate(${x * -0.1}px, ${y * -0.1}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-body font-medium"
        >
          Sebuah Perjalanan Spesial
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-5xl md:text-7xl font-script text-primary leading-tight"
        >
          Selamat Ulang Tahun
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="mt-2 text-2xl md:text-3xl font-display text-foreground italic">
            Untuk Kakakku Tersayang
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-4 flex items-center justify-center gap-3"
        >
          <span className="h-px w-12 bg-primary/40" />
          <p className="text-muted-foreground font-body text-sm">9 Februari 2026</p>
          <span className="h-px w-12 bg-primary/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-body font-semibold text-lg bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-glow"
          >
            <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span>Mulai Perjalanan</span>
            <Sparkles className="w-5 h-5 transition-transform group-hover:-rotate-12" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpeningSection;
