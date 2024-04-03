export const validateArrayInput = (input: string): boolean => {
  try {
    const parsedInput = JSON.parse(input);
    return Array.isArray(parsedInput);
  } catch (error) {
    return false;
  }
};

export const checkArrayHasElements = (input: string): boolean => {
  try {
    const parsedInput = JSON.parse(input);
    if (!Array.isArray(parsedInput) || parsedInput.length === 0) {
      return false;
    }

    for (const element of parsedInput) {
      if (typeof element === 'object' && Object.keys(element).length === 0) {
        // Check if element is an object and has no fields
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const validateNumberInput = (input: string): boolean => {
  return /^\d+$/.test(input);
};
