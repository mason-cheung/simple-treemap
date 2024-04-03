import React, {ChangeEvent} from "react";
import styles from './TextArea.module.css';

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const {placeholder, value, onChange, errorMessage, disabled} = props;
  return (
      <div className={styles.textareaContainer}>
        Data
        <textarea
            className={styles.textarea}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
  );
};

export default TextArea;
