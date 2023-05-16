import { ERROR_MESSAGE, NUM_LENGTH } from "../components/constants/initValue";

const isInputNull = (inputValue: string) => {
  return !inputValue;
};

const hasZero = (inputValue: string) => {
  return inputValue.includes("0");
};

const hasDuplicateNumber = (inputValue: string) => {
  return new Set(inputValue).size !== NUM_LENGTH;
};

export const isValidInputNumber = (inputValue: string) => {
  try {
    if (isInputNull(inputValue)) throw new Error(ERROR_MESSAGE.INPUT_NULL);

    if (hasZero(inputValue))
      throw new Error(ERROR_MESSAGE.INPUT_INVALID_NUM_RANGE);

    if (hasDuplicateNumber(inputValue))
      throw new Error(ERROR_MESSAGE.INPUT_DUPLICATE_NUM);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }

    return false;
  }
  return true;
};
