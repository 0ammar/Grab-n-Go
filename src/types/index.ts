// 🥘 الوجبة
export interface Meal {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  image: string;
  description?: string;
}

// 📂 تصنيف من قائمة الطعام
export interface MenuCategory {
  id: string;
  label: string;
}

// خصائص الوجبة MealCardProps
export interface MealCardProps {
  meal: Meal;
}

// MealsGridProps لتنظيم 
export interface MealsGridProps {
  meals: Meal[];
  activeTab: number;
  handleSwipe: (e: any, info: { offset: { x: number } }) => void;
}

// 🔘 تبويب التصنيفات (CategoryTab)
export interface CategoryTapProps {
  categories: MenuCategory[];
  activeIndex: number;
  onChange: (index: number) => void;
}

// 📦 مكون SectionContainer
export interface SectionContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  direction?: "left" | "right";
}
