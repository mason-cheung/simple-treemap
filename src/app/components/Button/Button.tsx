import React from "react";
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}) => {
  return (
      <button className={styles.button} onClick={onClick} disabled={disabled}>{children}</button>
  );
};

export default Button;
