import { useMotionTemplate, motion, MotionValue } from 'framer-motion';
import GridPattern from './GridPattern';
import { z } from 'zod';

// Definition of props validation schema
const cardPatternSchema = z.object({
  mouseX: z.instanceof(MotionValue<number>),
  mouseY: z.instanceof(MotionValue<number>),
  className: z.string().optional(),
});

type CardPatternProps = z.infer<typeof cardPatternSchema>;

// CardPattern component
const CardPattern: React.FC<CardPatternProps> = ({ mouseX, mouseY, className }) => {
  // Create mask image for gradient effect
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      {/* Grid pattern container */}
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-zinc-900/70 stroke-zinc-900/90"
        />
      </div>
      {/* Gradient effect container */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r  opacity-0 transition duration-300 group-hover:opacity-100 from-yellow-500/10 to-yellow-300/20 "
        style={style}
      />
      {/* Grid pattern container with overlay effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}>
        <GridPattern
          width={72}
          height={56}
          className={`absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg]  fill-white/2.5 stroke-white/10 ${className}`}
        />
      </motion.div>
    </div>
  );
};

export default CardPattern;
