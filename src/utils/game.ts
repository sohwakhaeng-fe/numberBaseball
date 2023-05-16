import {
  NUM_LENGTH,
  RESULT_MESSAGE,
  TYPE,
} from "../components/constants/initValue";

export const getGameResult = (
  computerNumberArray: number[],
  userNumberArray: number[]
) => {
  const matchedResult = userNumberArray.reduce(
    (result, userNumber, currentIdx) => {
      const findIdx = computerNumberArray.indexOf(userNumber);

      if (findIdx === -1) return result;

      return findIdx === currentIdx
        ? { ...result, [TYPE.STRIKE]: result[TYPE.STRIKE] + 1 }
        : { ...result, [TYPE.BALL]: result[TYPE.BALL] + 1 };
    },
    {
      [TYPE.BALL]: 0,
      [TYPE.STRIKE]: 0,
    }
  );

  return matchedResult;
};

const isGameSuccess = (strikeCount: number) => {
  return strikeCount === NUM_LENGTH;
};

const isNothing = (ballCount: number, strikeCount: number) => {
  return !(ballCount + strikeCount);
};

const getWinStatusAndResultText = (
  ballCount: number,
  strikeCount: number
): [boolean, string] => {
  if (isNothing(ballCount, strikeCount)) return [false, TYPE.NOTHING];

  if (isGameSuccess(strikeCount))
    return [true, `${RESULT_MESSAGE.SUCCESS} ${RESULT_MESSAGE.RESTART}`];

  return [
    false,
    `${ballCount > 0 ? `${ballCount}${TYPE.BALL} ` : ""}` +
      `${strikeCount > 0 ? `${strikeCount}${TYPE.STRIKE}` : ""}`,
  ];
};

export const play = (
  computerNumberArray: number[],
  userNumberArray: number[]
) => {
  const { [TYPE.BALL]: ballCount, [TYPE.STRIKE]: strikeCount } = getGameResult(
    computerNumberArray,
    userNumberArray
  );

  return getWinStatusAndResultText(ballCount, strikeCount);
};
