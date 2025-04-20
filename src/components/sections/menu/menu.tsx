
import './menu.scss';
import { CategoryTab, MealsGrid } from '@/components/ui';

import { useTabScrollNavigation } from '@/hooks';
import { menuCategories, meals } from '@/data/menuData';

interface MenuSectionProps {
  isActive: boolean;
  goBackToHero: () => void;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const MenuSection = ({
  isActive,
  goBackToHero,
  activeTab,
  setActiveTab,
}: MenuSectionProps) => {
  const activeCategory = menuCategories[activeTab];
  const filteredMeals = meals.filter((meal) => meal.categoryId === activeCategory.id);

  useTabScrollNavigation(isActive, activeTab, setActiveTab, goBackToHero);

  return (
    <section className="menu-section">
      <CategoryTab
        categories={menuCategories}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="meal-grid-container">
        <MealsGrid meals={filteredMeals} activeTab={activeTab} />
      </div>
    </section>
  );
};

export default MenuSection;
