import React from "react";
import styles from "./ad-card.module.css";
import PromoCard from "../Ads/Promo/PromoCard";

interface AdCardProps extends React.HTMLAttributes<HTMLDivElement> {}
const AdCard: React.FC<AdCardProps> = ({ title, className = "", ...props }) => {
  return (
    <div className={`${styles["ad-card"]} ${className}`} {...props}>
      <PromoCard />
    </div>
  );
};

export default AdCard;
