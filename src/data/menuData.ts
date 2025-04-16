import product1 from '@/assets/images/product-1.jpg';
import { Meal, MenuCategory } from '@/types';

export const menuCategories: MenuCategory[] = [
  { id: 'broasted', label: 'Broasted' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'sides', label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'grill', label: 'Grill' }
];

export const meals: Meal[] = [
  // Broasted
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `b${i + 1}`,
    name: `Broasted Meal ${i + 1}`,
    description: 'Golden crispy chicken with fries and coleslaw.',
    price: 16 + i,
    image: product1,
    categoryId: 'broasted'
  })),

  // Wraps
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `w${i + 1}`,
    name: `Wrap ${i + 1}`,
    description: 'Delicious wrap with fresh ingredients.',
    price: 7 + i,
    image: product1,
    categoryId: 'wraps'
  })),

  // Sides
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `s${i + 1}`,
    name: `Side Dish ${i + 1}`,
    description: 'Tasty side to complement your meal.',
    price: 3 + i,
    image: product1,
    categoryId: 'sides'
  })),

  // Drinks
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `d${i + 1}`,
    name: `Drink ${i + 1}`,
    description: 'Refreshing beverage to enjoy.',
    price: 1 + i,
    image: product1,
    categoryId: 'drinks'
  })),

  // Desserts
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `ds${i + 1}`,
    name: `Dessert ${i + 1}`,
    description: 'Sweet treat to finish your meal.',
    price: 4 + i,
    image: product1,
    categoryId: 'desserts'
  })),

  // Pasta
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Pasta Dish ${i + 1}`,
    description: 'Creamy or red sauce pasta variety.',
    price: 9 + i,
    image: product1,
    categoryId: 'pasta'
  })),

  // Burgers
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `bg${i + 1}`,
    name: `Burger ${i + 1}`,
    description: 'Juicy burger with toppings.',
    price: 8 + i,
    image: product1,
    categoryId: 'burgers'
  })),

  // Grill
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `g${i + 1}`,
    name: `Grill Plate ${i + 1}`,
    description: 'Grilled meats and veggies.',
    price: 12 + i,
    image: product1,
    categoryId: 'grill'
  }))
];
