import styles from "./footer.module.css";
interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
const Footer: React.FC<FooterProps> = ({className = ""}) => {
    const brand = import.meta.env.VITE_FOOTER_COPYRIGHT || "NovaPlay";
    const contact = import.meta.env.VITE_EMAIL_CONTACT || "hola@novaplay.demo";
    return <footer className={`${styles.footer} ${className}`}>
        <span>&copy; {brand} 2026 — Plataforma multimedia demo</span>
        <span>Contacto: {contact}</span>
    </footer>
}

export default Footer;