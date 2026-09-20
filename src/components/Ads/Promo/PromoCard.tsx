import styles from "../ads.module.css";

type PromoCardProps = React.HTMLAttributes<HTMLDivElement>;

/** Espacio promocional con las mismas dimensiones que una card de póster (2:3). */
const PromoCard: React.FC<PromoCardProps> = ({ className = "", ...props }) => {
  return (
    <div className={`${styles["promo-card"]} ${className}`} {...props}>
      <div className={styles["promo-card-thumb"]}>
        <span className={styles["promo-label"]}>Espacio promocional</span>
      </div>
      <div className={styles["promo-card-body"]}>
        <span className={styles["promo-card-line"]} />
        <span className={`${styles["promo-card-line"]} ${styles["short"]}`} />
      </div>
    </div>
  );
};

export default PromoCard;
