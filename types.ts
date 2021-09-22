// make color and category enum
export interface ItemCard {
  color: string;
  category: string;
  name: string;
  id: string;
}

// Make types enum
export interface GoalCard {
  id: string;
  type: string;
  name: string;
}

export interface PlayerState {
  goals: GoalCard[];
  hand: ItemCard[];
  collection: ItemCard[];
  money: number;
}

export interface AllPlayersState {
  [key: string]: PlayerState;
}

export interface AuctionState {
  card: ItemCard | null;
  highestBidder: string | null;
  currentBid: number;
  passedPlayers: string[];
}

export interface DivorceGameState {
  players: AllPlayersState;
  auction: AuctionState;
  deck: ItemCard[];
}
