import styles from "./button.module.css";
import Button, { ButtonProps } from "./Button";
export interface ButtonIconProps extends ButtonProps{
}
const ButtonIcon: React.FC<ButtonIconProps> = ({className = "", radius = "sm", children, ...props}) => {
    return <Button className={`${styles["button-icon"]} ${className}`} radius={radius} {...props}>
        {children}
    </Button>
}

export default ButtonIcon;