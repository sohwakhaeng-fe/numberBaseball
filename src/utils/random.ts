import { MAX, MIN, NUM_LENGTH } from "../components/constants/initValue";

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateComputerNumber = () => {
  const computerNumber = new Set<number>();

  while (computerNumber.size < NUM_LENGTH) {
    computerNumber.add(generateRandomNumber(MIN, MAX));
  }

  return [...computerNumber];
};
