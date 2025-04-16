import './sectionContainer.scss';
import { motion } from 'framer-motion';
import { SectionContainerProps } from '@/types';

const SectionContainer = ({
  children,
  isVisible,
  direction = 'right',
}: SectionContainerProps) => {
  const variants = {
    hidden: {
      x: direction === 'right' ? '100%' : '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.section
      className="section-container"
      variants={variants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.section>
  );
};

export default SectionContainer;
