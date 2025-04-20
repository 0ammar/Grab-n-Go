import { motion } from 'framer-motion';
import { MealCard } from '@/components/ui';
import { MealsGridProps } from '@/types';

const MealsGrid = ({ meals, activeTab }: MealsGridProps) => {
  return (
    <motion.div
      key={activeTab}
      className="meals-grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
    >
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </motion.div>
  );
};

export default MealsGrid;
