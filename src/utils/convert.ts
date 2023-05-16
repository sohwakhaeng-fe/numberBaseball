export const convertStringToNumberElementArray = (string: string) => {
  return string.split("").map((num) => +num);
};
