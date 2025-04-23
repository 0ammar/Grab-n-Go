// ✅ MenuSection.tsx (Final with animated arrows for mobile)
import './menu.scss';
import { CategoryTab, MealsGrid } from '@/components/ui';
import { useTabScrollNavigation } from '@/hooks';
import { menuCategories, meals } from '@/data/menuData';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface MenuSectionProps {
  isActive: boolean;
  goBackToHero: () => void;
  activeTab: number;
  setActiveTab: (index: number) => void;
  goToSection: (index: number) => void;
}

const MenuSection = ({
  isActive,
  goBackToHero,
  activeTab,
  setActiveTab,
  goToSection,
}: MenuSectionProps) => {
  const activeCategory = menuCategories[activeTab];
  const filteredMeals = meals.filter((meal) => meal.categoryId === activeCategory.id);

  useTabScrollNavigation(isActive, activeTab, setActiveTab, goBackToHero);

  const handleNextSection = () => goToSection(2); 
  const handlePreviousSection = () => goBackToHero(); 

  return (
    <section className="menu-section">
      <CategoryTab
        categories={menuCategories}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="meal-grid-container">
        <MealsGrid meals={filteredMeals} activeTab={activeTab} />

        <div className="section-arrows">
          <button
            className="arrow-button left"
            onClick={handlePreviousSection}
            aria-label="Go to Hero"
          >
            <FaArrowLeft />
          </button>
          <button
            className="arrow-button right"
            onClick={handleNextSection}
            aria-label="Go to About"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;