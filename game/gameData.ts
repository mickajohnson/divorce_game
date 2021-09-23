import random from "lodash/random";
import shuffle from "lodash/shuffle";
import { ARBITRATION } from "../constants";

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
  ];

  const arbitrationCard = {
    special: false,
    color: null,
    category: null,
    name: "Arbitration",
    id: ARBITRATION,
  };

  const insertPoint = random(deck.length - 4, deck.length);
  deck.splice(insertPoint, 0, arbitrationCard);

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
