import { forwardRef } from "react";
import styles from "./input.module.css";
import Input, { InputProps } from "./Input";
import { CiSearch } from "react-icons/ci";

interface InputSearchProps extends InputProps {
    form?: string;
    defaultValue?: string;
} 
const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(({className = "", form, ...props}, ref) => {
    return <div className={`${styles["input-search"]} ${className}`}>
        <Input ref={ref} {...props} />
        <button form={form}> 
            <CiSearch size={20} color="white"/>
        </button>
    </div>
});

export default InputSearch;