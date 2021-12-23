import random from "lodash/random";
import shuffle from "lodash/shuffle";
import { MEDIATION } from "../constants";

import { GoalCard, ItemCard } from "../types";

export function generateCards(): ItemCard[] {
  const deck: ItemCard[] = [
    {
      special: false,
      color: "green",
      category: "furniture",
      name: "green chair",
      id: "green_chair",
    },
    {
      special: false,
      color: "purple",
      category: "furniture",
      name: "purple chair",
      id: "purple_chair",
    },
    {
      special: false,
      color: "orange",
      category: "furniture",
      name: "orange chair",
      id: "orange_chair",
    },
    {
      special: false,
      color: "brown",
      category: "furniture",
      name: "brown chair",
      id: "brown_chair",
    },
    {
      special: false,
      color: "black",
      category: "furniture",
      name: "black chair",
      id: "black_chair",
    },
    {
      special: false,
      color: "green",
      category: "appliances",
      name: "green washer",
      id: "green_washer",
    },
    {
      special: false,
      color: "purple",
      category: "appliances",
      name: "purple washer",
      id: "purple_washer",
    },
    {
      special: false,
      color: "orange",
      category: "appliances",
      name: "orange washer",
      id: "orange_washer",
    },
    {
      special: false,
      color: "brown",
      category: "appliances",
      name: "brown washer",
      id: "brown_washer",
    },
    {
      special: false,
      color: "black",
      category: "appliances",
      name: "black washer",
      id: "black_washer",
    },
    {
      special: false,
      color: "green",
      category: "entertainment",
      name: "green tv",
      id: "green_tv",
    },
    {
      special: false,
      color: "purple",
      category: "entertainment",
      name: "purple tv",
      id: "purple_tv",
    },
    {
      special: false,
      color: "orange",
      category: "entertainment",
      name: "orange tv",
      id: "orange_tv",
    },
    {
      special: false,
      color: "brown",
      category: "entertainment",
      name: "brown tv",
      id: "brown_tv",
    },
    {
      special: false,
      color: "black",
      category: "entertainment",
      name: "black tv",
      id: "black_tv",
    },
    {
      special: false,
      color: "green",
      category: "decor",
      name: "green vase",
      id: "green_vase",
    },
    {
      special: false,
      color: "purple",
      category: "decor",
      name: "purple vase",
      id: "purple_vase",
    },
    {
      special: false,
      color: "orange",
      category: "decor",
      name: "orange vase",
      id: "orange_vase",
    },
    {
      special: false,
      color: "brown",
      category: "decor",
      name: "brown vase",
      id: "brown_vase",
    },
    {
      special: false,
      color: "black",
      category: "decor",
      name: "black vase",
      id: "black_vase",
    },
    {
      special: false,
      color: "green",
      category: "tools",
      name: "green hammer",
      id: "green_hammer",
    },
    {
      special: false,
      color: "purple",
      category: "tools",
      name: "purple hammer",
      id: "purple_hammer",
    },
    {
      special: false,
      color: "orange",
      category: "tools",
      name: "orange hammer",
      id: "orange_hammer",
    },
    {
      special: false,
      color: "brown",
      category: "tools",
      name: "brown hammer",
      id: "brown_hammer",
    },
    {
      special: false,
      color: "black",
      category: "tools",
      name: "black hammer",
      id: "black_hammer",
    },
  ];

  const mediationCard = {
    special: false,
    color: "mediation",
    category: "mediation",
    name: "Mediation",
    id: MEDIATION,
  };

  const insertPoint = random(deck.length - 4, deck.length);
  deck.splice(insertPoint, 0, mediationCard);

  return deck;
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

export function generateInitialAuctionState() {
  return { card: null, currentBid: 0, highestBidder: null, passedPlayers: [] };
}
