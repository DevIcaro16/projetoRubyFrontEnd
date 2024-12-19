import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./InputPassword.module.scss";

interface InputPasswordProps {
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Tipo correto para onChange
}

const InputPassword = ({ label, name, placeholder, value, onChange }: InputPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={styles.fieldGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    name={name}
                    placeholder={placeholder}
                    className={styles.input}
                    value={value}
                    onChange={onChange} // Corrigido para aceitar função
                />
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default InputPassword;
