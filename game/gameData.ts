import shuffle from "lodash/shuffle";

import { GoalCard, ItemCard } from "../types";

export function generateCards(): ItemCard[] {
  return shuffle([
    {
      color: "green",
      category: "furniture",
      name: "green chair",
      id: "green_chair",
    },
    {
      color: "purple",
      category: "furniture",
      name: "purple chair",
      id: "purple_chair",
    },
    {
      color: "orange",
      category: "furniture",
      name: "orange chair",
      id: "orange_chair",
    },
    {
      color: "brown",
      category: "furniture",
      name: "brown chair",
      id: "brown_chair",
    },
    {
      color: "black",
      category: "furniture",
      name: "black chair",
      id: "black_chair",
    },
    {
      color: "green",
      category: "appliances",
      name: "green washer",
      id: "green_washer",
    },
    {
      color: "purple",
      category: "appliances",
      name: "purple washer",
      id: "purple_washer",
    },
    {
      color: "orange",
      category: "appliances",
      name: "orange washer",
      id: "orange_washer",
    },
    {
      color: "brown",
      category: "appliances",
      name: "brown washer",
      id: "brown_washer",
    },
    {
      color: "black",
      category: "appliances",
      name: "black washer",
      id: "black_washer",
    },
  ]);
}

export function generateGoals(): {
  colors: GoalCard[];
  categories: GoalCard[];
} {
  const colors = [
    {
      id: "green",
      type: "color",
      name: "green",
    },
    {
      id: "purple",
      type: "color",
      name: "purple",
    },
    {
      id: "black",
      type: "color",
      name: "black",
    },
    {
      id: "orange",
      type: "color",
      name: "orange",
    },
    {
      id: "brown",
      type: "color",
      name: "brown",
    },
  ];
  const categories = [
    {
      id: "furniture",
      type: "category",
      name: "furniture",
    },
    {
      id: "appliances",
      type: "category",
      name: "appliances",
    },
    {
      id: "decor",
      type: "category",
      name: "decor",
    },
    {
      id: "tools",
      type: "category",
      name: "tools",
    },
    {
      id: "entertainment",
      type: "category",
      name: "entertainment",
    },
  ];
  return { colors: shuffle(colors), categories: shuffle(categories) };
}
