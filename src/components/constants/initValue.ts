export const NUM_LENGTH = 3;
export const MIN = 1;
export const MAX = 9;

export const TYPE = {
  NOTHING: "낫싱",
  BALL: "볼",
  STRIKE: "스트라이크",
} as const;

export const RESULT_MESSAGE = {
  SUCCESS: "🎉정답을 맞추셨습니다🎉",
  RESTART: "게임을 다시 시작하시겠습니까?",
} as const;

export const ERROR_MESSAGE = {
  INPUT_NULL: "입력값이 존재하지 않습니다.",
  INPUT_INVALID_NUM_RANGE: "1~9 사이의 숫자를 입력해주세요.",
  INPUT_DUPLICATE_NUM: "중복된 숫자를 입력할 수 없습니다.",
} as const;
