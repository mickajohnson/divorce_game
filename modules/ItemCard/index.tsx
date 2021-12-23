import { BsHammer } from "react-icons/bs";
import { MdChair, MdStar } from "react-icons/md";
import { GiPorcelainVase } from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import styles from "./ItemCard.module.scss";
import { ItemCard as ItemCardType } from "../../types";

const categoryToIconMapping = {
  tools: BsHammer,
  appliances: CgSmartHomeWashMachine,
  furniture: MdChair,
  entertainment: MdStar,
  decor: GiPorcelainVase,
};

interface HandCardProps {
  card: ItemCardType;
  onDoubleClick: () => {}; // needs to be optional and better typed
}

export default function ItemCard({ card, onDoubleClick }: HandCardProps) {
  const Icon = categoryToIconMapping[card.category];
  return (
    <div onDoubleClick={onDoubleClick} className={styles.container}>
      {card.name}
      <div>
        <Icon color={card.color} size="3em" />
      </div>
    </div>
  );
}
