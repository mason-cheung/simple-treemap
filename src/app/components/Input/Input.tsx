import React, {ChangeEvent} from 'react';
import styles from './Input.module.css';

interface InputProps {
  type: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {type, placeholder, value, onChange, errorMessage, disabled} = props;
  return (
      <div className={styles.inputContainer}>
        Row number
        <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
  );
};

export default Input;
