
import './mealCard.scss';
import { IoMdAdd } from 'react-icons/io';
import { MealCardProps } from '@/types';

const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div className="meal-card">
      <div className="image-wrapper">
        <img src={meal.image} alt={meal.name} className="meal-image" />
        <p className="meal-description">{meal.description}</p>
        <button className="add-btn" aria-label={`Add ${meal.name} to cart`}>
          <IoMdAdd />
        </button>
      </div>
      <div className="meal-info">
        <div className="meal-header">
          <h4 className="meal-name">{meal.name}</h4>
          <span className="meal-price">${meal.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
