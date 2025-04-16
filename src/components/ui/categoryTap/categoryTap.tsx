import './categoryTap.scss';
import { CategoryTapProps } from '@/types';

const CategoryTap = ({ categories, activeIndex, onChange }: CategoryTapProps) => {
  return (
    <div className="category-tap-wrapper">
      {categories.map((category, index) => (
        <button
          key={category.id}
          className={`category-tap ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onChange(index)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTap;
