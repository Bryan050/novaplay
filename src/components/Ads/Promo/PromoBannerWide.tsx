import styles from "../ads.module.css";

type PromoBannerWideProps = React.HTMLAttributes<HTMLDivElement>;

/** Espacio promocional genérico (formato ancho). Sin redes externas. */
const PromoBannerWide: React.FC<PromoBannerWideProps> = ({ className = "", ...props }) => {
  return (
    <div className={`${styles["promo"]} ${styles["promo-wide"]} ${className}`} {...props}>
      <span className={styles["promo-label"]}>Espacio promocional</span>
      <span className={styles["promo-size"]}>970 × 250</span>
    </div>
  );
};

export default PromoBannerWide;
