import {fireEvent, render, waitFor} from '@testing-library/react';
import Page from '../page';
import '@testing-library/jest-dom';
import React from 'react';

test('validates JSON array input', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const dataInput = getByPlaceholderText('JSON array data for treemap');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Input should be a valid JSON array')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(dataInput, {target: {value: 'invalid JSON array'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Input should be a valid JSON array')).toBeInTheDocument();
  });
});

test('validates array has at least one non-empty element', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const dataInput = getByPlaceholderText('JSON array data for treemap');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Array should have at least one non-empty element')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(dataInput, {target: {value: '[]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Array should have at least one non-empty element')).toBeInTheDocument();
  });
});

test('validates name is a string and less than 50 characters', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const dataInput = getByPlaceholderText('JSON array data for treemap');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Name should be a string and less than 50 characters')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": 123, "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Name should be a string and less than 50 characters')).toBeInTheDocument();
  });

  fireEvent.change(dataInput, {target: {value: '[{ "name": "dijfbwjkfbwdijfbwijfbwifwqfweqfwefjbewifbiewbfiewjbf", "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Name should be a string and less than 50 characters')).toBeInTheDocument();
  });
});

test('validates weight is an integer', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const dataInput = getByPlaceholderText('JSON array data for treemap');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": 6 }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Weight should be an integer')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": "6" }]'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Weight should be an integer')).toBeInTheDocument();
  });
});

test('validates row number is an integer', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const rowNumberInput = getByPlaceholderText('Row number to display');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(rowNumberInput, {target: {value: '5'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Row number should be an integer')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(rowNumberInput, {target: {value: '5.5'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Row number should be an integer')).toBeInTheDocument();
  });
});

test('validates row number is less than or equal to array length', async () => {
  const {getByPlaceholderText, getByText, queryByText} = render(<Page/>);
  const dataInput = getByPlaceholderText('JSON array data for treemap');
  const rowNumberInput = getByPlaceholderText('Row number to display');
  const generateButton = getByText('Generate');

  // Simulate user typing valid data into the input field
  fireEvent.change(dataInput, {target: {value: '[{ "name": "A", "value": 10, "weight": 6 }]'}});
  fireEvent.change(rowNumberInput, {target: {value: '1'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(queryByText('Row number should be less than or equal to the array length')).not.toBeInTheDocument();
  });

  // Simulate user typing invalid data into the input field
  fireEvent.change(rowNumberInput, {target: {value: '2'}});

  fireEvent.click(generateButton);

  await waitFor(() => {
    expect(getByText('Row number should be less than or equal to the array length')).toBeInTheDocument();
  });
});
