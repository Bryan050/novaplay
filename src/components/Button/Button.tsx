import { ReactNode } from "react";
import styles from "./button.module.css";
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    color?: "primary";
    radius?: "sm" | "lg";
}
const Button: React.FC<ButtonProps> = ({className = "", color = "primary", radius = "sm", children, ...props}) => {
    return <button className={`${styles.button} ${styles[`button-${color}`]} ${styles[`radius-${radius}`]} ${className}`} {...props}>
        {children}
    </button>
}

export default Button;