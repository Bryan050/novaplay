import { forwardRef } from "react";
import styles from "./input.module.css";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
} 
const Input = forwardRef<HTMLInputElement, InputProps>(({className = "", ...props}, ref) => {
    return <input className={`${styles.input} ${className}`} ref={ref} {...props} />
});

export default Input;