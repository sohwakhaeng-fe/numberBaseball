import React, { forwardRef } from "react";
import { NUM_LENGTH } from "./constants/initValue";

type InputFormProps = {
  isGameSuccess: boolean;
  onSubmitInputForm: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ onSubmitInputForm, isGameSuccess }: InputFormProps, ref) => {
    return (
      <form onSubmit={onSubmitInputForm}>
        <input
          type="number"
          id="user-input"
          ref={ref}
          min={Math.pow(10, NUM_LENGTH - 1)}
          max={Math.pow(10, NUM_LENGTH) - 1}
        />
        <button id="submit" type="submit" disabled={isGameSuccess}>
          확인
        </button>
      </form>
    );
  }
);

export default InputForm;
