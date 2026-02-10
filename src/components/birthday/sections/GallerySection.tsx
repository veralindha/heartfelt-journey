import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { ChevronLeft, ChevronRight, ArrowRight, ImageIcon, Camera } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    gradient: 'from-primary/20 via-accent/10 to-sky-soft/30',
    icon: '📸',
    caption: 'Momen pertama kita bersama',
  },
  {
    gradient: 'from-sunset-warm/20 via-gold-shimmer/10 to-cream-warm/30',
    icon: '🎂',
    caption: 'Ulang tahun yang tak terlupakan',
  },
  {
    gradient: 'from-lavender/30 via-primary/10 to-sky-soft/20',
    icon: '🌅',
    caption: 'Perjalanan yang indah',
  },
  {
    gradient: 'from-sky-soft/30 via-accent/20 to-lavender/20',
    icon: '💫',
    caption: 'Tawa dan kebahagiaan',
  },
  {
    gradient: 'from-rose-glow/15 via-primary/10 to-cream-warm/30',
    icon: '🌸',
    caption: 'Kenangan terindah',
  },
];

interface Props {
  onNext: () => void;
}

const GallerySection = ({ onNext }: Props) => {
  const { x, y } = useMouseParallax(6);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % GALLERY_ITEMS.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-cream-warm via-background to-lavender/20 transition-transform duration-300"
        style={{ transform: `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)` }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
          <h2 className="text-3xl md:text-4xl font-script text-primary">
            Galeri Kenangan
          </h2>
          <p className="text-muted-foreground mt-2 font-body text-sm">
            Momen-momen berharga kita bersama
          </p>
        </motion.div>

        {/* Dots - positioned above carousel */}
        <div className="flex justify-center gap-2 mb-4">
          {GALLERY_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? 'bg-primary scale-125' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${GALLERY_ITEMS[currentSlide].gradient} flex flex-col items-center justify-center p-8 border border-border/30 shadow-xl`}
            >
              <span className="text-6xl mb-4">
                {GALLERY_ITEMS[currentSlide].icon}
              </span>
              <ImageIcon className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground/50 font-body text-sm">
                Tambahkan foto kenangan di sini
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 shadow-md hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/30 shadow-md hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mt-4 text-lg font-display text-foreground italic"
          >
            &ldquo;{GALLERY_ITEMS[currentSlide].caption}&rdquo;
          </motion.p>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GallerySection;
