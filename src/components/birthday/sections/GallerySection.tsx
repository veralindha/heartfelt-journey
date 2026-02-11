import { motion } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { Camera } from 'lucide-react';
import galleryPhoto from '@/assets/gallery-1.jpeg';

interface Props {
  onNext: () => void;
}

const GallerySection = ({ onNext }: Props) => {
  const { x, y } = useMouseParallax(6);

  return (
    <section className="relative w-full h-full flex items-center justify-center overflow-hidden px-4">
      <div
        className="absolute inset-0 bg-gradient-to-br from-cream-warm via-background to-lavender/20 transition-transform duration-300"
        style={{ transform: `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)` }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <Camera className="w-8 h-8 text-primary mx-auto mb-2" />
          <h2 className="text-3xl md:text-4xl font-script text-primary">
            Galeri Kenangan
          </h2>
          <p className="text-muted-foreground mt-2 font-body text-sm">
            Momen berharga kita bersama
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-sky-soft/30 flex flex-col items-center justify-center p-8 border border-border/30 shadow-xl"
        >
          <img
            src={galleryPhoto}
            alt="Kenangan bersama"
            className="w-full h-full object-cover rounded-3xl"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4 text-lg font-display text-foreground italic"
        >
          &ldquo;Momen pertama kita bersama&rdquo;
        </motion.p>
      </div>
    </section>
  );
};

export default GallerySection;
