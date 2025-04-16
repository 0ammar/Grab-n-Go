import { motion, AnimatePresence } from 'framer-motion';
import { MealCard } from '@/components/ui';
import { MealsGridProps } from '@/types';

const MealsGrid = ({ meals, activeTab, handleSwipe }: MealsGridProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        className="meals-grid"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.6 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleSwipe}
      >
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default MealsGrid;
