import styles from "../ads.module.css";

type PromoBannerBoxProps = React.HTMLAttributes<HTMLDivElement>;

/** Espacio promocional genérico (formato caja). Sin redes externas. */
const PromoBannerBox: React.FC<PromoBannerBoxProps> = ({ className = "", ...props }) => {
  return (
    <div className={`${styles["promo"]} ${styles["promo-box"]} ${className}`} {...props}>
      <span className={styles["promo-label"]}>Espacio promocional</span>
      <span className={styles["promo-size"]}>300 × 250</span>
    </div>
  );
};

export default PromoBannerBox;
