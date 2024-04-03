'use client';
import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './page.module.css'
import Input from "@/app/components/Input/Input";
import TextArea from "@/app/components/TextArea/TextArea";
import Button from "@/app/components/Button/Button";
import Treemap from "@/app/components/Treemap/Treemap";
import {checkArrayHasElements, validateArrayInput, validateNumberInput} from "@/app/utils";

export default function Page() {
  const [dataInput, setDataInput] = useState<string>('');
  const [rowNumber, setRowNumber] = useState<string>('');
  const [dataInputErrorMessage, setDataInputErrorMessage] = useState<string>('');
  const [rowNumberErrorMessage, setRowNumberErrorMessage] = useState<string>('');
  const [parsedData, setParsedData] = useState<any>([]);
  const [clearButtonDisabled, setClearButtonDisabled,] = useState<boolean>(true);

  const handleDataInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;

    if (!validateArrayInput(inputValue) && inputValue.trim() !== '') {
      setDataInputErrorMessage('Input should be a valid JSON array');
    } else if (!checkArrayHasElements(inputValue) && inputValue.trim() !== '') {
      setDataInputErrorMessage('Array should have at least one non-empty element');
    } else if (inputValue.trim() === '') {
      setDataInputErrorMessage('');
    } else {
      setDataInputErrorMessage('');
      const parsedInput = JSON.parse(inputValue);

      for (let data of parsedInput) {
        if (typeof data.name !== 'string' || data.name.length >= 50) {
          setDataInputErrorMessage('Name should be a string and less than 50 characters');
          return;
        }

        if (!Number.isInteger(data.weight)) {
          setDataInputErrorMessage('Weight should be an integer');
          return;
        }
      }
    }

    setDataInput(inputValue);
  };

  const handleRowNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedInput = parseFloat(inputValue);

    setRowNumber(inputValue);

    if (inputValue === '') {
      setRowNumberErrorMessage('');
      setRowNumber('');
      return;
    }

    if (!validateNumberInput(inputValue)) {
      setRowNumberErrorMessage('Row number should be an integer');
      return;
    }

    if (dataInput) {
      const dataInputArray = JSON.parse(dataInput);
      if (parsedInput > dataInputArray.length) {
        setRowNumberErrorMessage('Row number should be less than or equal to the array length');
        return;
      }
    }

    setRowNumberErrorMessage('');
  };

  const handleButtonClick = () => {
    if (dataInput && rowNumber) {
      const parsedData = JSON.parse(dataInput);
      setParsedData(parsedData);
    }
  };

  const handleClearButtonClick = () => {
    setParsedData([]);
    setDataInput('');
    setRowNumber('');
  }

  useEffect(() => {
    if (parsedData.length > 0) {
      setDataInputErrorMessage('');
      setClearButtonDisabled(false);
    } else {
      setClearButtonDisabled(true);
    }
  }, [parsedData]);

  useEffect(() => {
    if (dataInput && rowNumber && validateArrayInput(dataInput) && checkArrayHasElements(dataInput)) {
      setDataInputErrorMessage('');
    } else {
      setParsedData([])
    }
  }, [dataInput, rowNumber]);

  return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <TextArea
                placeholder={"JSON array data for treemap"}
                value={dataInput}
                onChange={handleDataInput}
                errorMessage={dataInputErrorMessage}
            />
            <div className={styles.lowerInput}>
              <Input
                  type="numeric"
                  placeholder="Row number to display"
                  value={rowNumber}
                  onChange={handleRowNumberInput}
                  errorMessage={rowNumberErrorMessage}
              />
              <div className={styles.buttonContainer}>
                <Button onClick={handleButtonClick}>Generate</Button>
                <Button onClick={handleClearButtonClick} disabled={clearButtonDisabled}>Clear</Button>
              </div>
            </div>
          </div>
          <div className={styles.treemapContainer}>
            <div>Result</div>
            <Treemap data={parsedData} rowNumber={parseInt(rowNumber)}/>
          </div>
        </div>
      </main>
  );
}
