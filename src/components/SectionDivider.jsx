import { motion } from 'framer-motion';

const SectionDivider = () => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.125 }}
    className="bg-muted my-3 h-8 w-1 rounded-full"
  />
);

export default SectionDivider;
