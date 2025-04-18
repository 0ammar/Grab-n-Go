// 🧠 Types
import { Meal, MenuCategory } from '@/types';

// 🖼️ Real Images
import product1 from '@/assets/images/product-1.jpg';
import product2 from '@/assets/images/product-2.png';
import product3 from '@/assets/images/product-3.png';
import product4 from '@/assets/images/product-4.png';
import product5 from '@/assets/images/product-5.png';
import product6 from '@/assets/images/product-6.png';
import product7 from '@/assets/images/product-7.png';

// 🗂️ Categories
export const menuCategories: MenuCategory[] = [
  { id: 'broasted', label: 'Broasted' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'grill', label: 'Grill' },
  { id: 'kids', label: 'Kids' },
  { id: 'boxes', label: 'Meal Boxes' },
  { id: 'offers', label: 'Offers' },
];

// 🍽️ Meals
export const meals: Meal[] = [
  // Broasted
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `b${i + 1}`,
    name: `Broasted Meal ${i + 1}`,
    description: 'Golden crispy chicken with fries and coleslaw.',
    price: 15 + i,
    image: product4,
    categoryId: 'broasted',
  })),

  // Wraps
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `w${i + 1}`,
    name: `Wrap ${i + 1}`,
    description: 'Delicious wrap with fresh ingredients.',
    price: 7 + i,
    image: product6,
    categoryId: 'wraps',
  })),

  // Sides
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `Side Dish ${i + 1}`,
    description: 'Tasty side to complement your meal.',
    price: 3 + i,
    image: product1,
    categoryId: 'sides',
  })),

  // Drinks
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `d${i + 1}`,
    name: `Drink ${i + 1}`,
    description: 'Refreshing beverage to enjoy.',
    price: 2 + i,
    image: product2,
    categoryId: 'drinks',
  })),

  // Desserts
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `ds${i + 1}`,
    name: `Dessert ${i + 1}`,
    description: 'Sweet treat to finish your meal.',
    price: 4 + i,
    image: product4,
    categoryId: 'desserts',
  })),

  // Pasta
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Pasta Dish ${i + 1}`,
    description: 'Creamy or red sauce pasta variety.',
    price: 9 + i,
    image: product1,
    categoryId: 'pasta',
  })),

  // Burgers
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `bg${i + 1}`,
    name: `Burger ${i + 1}`,
    description: 'Juicy burger with toppings.',
    price: 10 + i,
    image: product5,
    categoryId: 'burgers',
  })),

  // Grill
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `g${i + 1}`,
    name: `Grill Plate ${i + 1}`,
    description: 'Grilled meats and veggies.',
    price: 12 + i,
    image: product3,
    categoryId: 'grill',
  })),

  // Kids Meals
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `k${i + 1}`,
    name: `Kids Meal ${i + 1}`,
    description: 'A small portion perfect for kids, includes a toy!',
    price: 9 + i,
    image: product7,
    categoryId: 'kids',
  })),

  // Meal Boxes
  ...Array.from({ length: 16 }, (_, i) => ({
    id: `box${i + 1}`,
    name: `Meal Box ${i + 1}`,
    description: 'Combo of chicken, burger, fries and a drink.',
    price: 18 + i,
    image: product3,
    categoryId: 'boxes',
  })),

  // Special Offers
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `offer${i + 1}`,
    name: `Special Offer ${i + 1}`,
    description: 'Limited-time combo deal with great value.',
    price: 20 + i * 2,
    image: product6,
    categoryId: 'offers',
  })),
];
