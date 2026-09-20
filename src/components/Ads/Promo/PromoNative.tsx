import styles from "../ads.module.css";

type PromoNativeProps = React.HTMLAttributes<HTMLDivElement>;

/** Slot nativo genérico para el feed. Sin scripts externos. */
const PromoNative: React.FC<PromoNativeProps> = ({ className = "", ...props }) => {
  return (
    <div className={`${styles["promo"]} ${styles["promo-native"]} ${className}`} {...props}>
      <span className={styles["promo-label"]}>Contenido destacado</span>
    </div>
  );
};

export default PromoNative;
