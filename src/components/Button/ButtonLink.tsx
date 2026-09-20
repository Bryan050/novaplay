import { ReactNode } from "react";
import styles from "./button.module.css";
import { Link } from "react-router-dom";
interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement>{
    children: ReactNode;
    color?: "primary";
    radius?: "sm" | "lg";
    to?: string;
    target?: "_blank";
}
const ButtonLink: React.FC<ButtonLinkProps> = ({to = "", target, className = "", color = "primary", radius = "sm", children, ...props}) => {
    return <Link to={to} target={target} className={`${styles.button} ${styles["button-link"]} ${styles[`button-${color}`]} ${styles[`radius-${radius}`]} ${className}`} {...props}>
        {children}
    </Link>
}

export default ButtonLink;