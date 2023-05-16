import React, { useEffect, useRef, useState } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { convertStringToNumberElementArray } from "./utils/convert";
import { generateComputerNumber } from "./utils/random";
import { isValidInputNumber } from "./utils/validate";
import { play } from "./utils/game";
import "./App.css";

function App() {
  const userInput = useRef<HTMLInputElement>(null);

  const [computerNumberArray, setComputerNumberArray] = useState<number[]>([]);
  const [resultText, setResultText] = useState("");

  const [isGameSuccess, setIsGameSuccess] = useState(false);

  const onSubmitInputForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.current) return;
    if (!isValidInputNumber(userInput.current.value)) return;

    const userNumberArray = convertStringToNumberElementArray(
      userInput.current.value
    );

    const [isGameSuccess, resultText] = play(
      computerNumberArray,
      userNumberArray
    );

    setResultText(resultText);
    setIsGameSuccess(isGameSuccess);
  };

  const restart = () => {
    if (userInput.current?.value) {
      userInput.current.value = "";
    }

    setComputerNumberArray(generateComputerNumber());
    setResultText("");
    setIsGameSuccess(false);
  };

  useEffect(() => {
    setComputerNumberArray(generateComputerNumber());
  }, []);

  return (
    <div id="app">
      <h1>⚾ 숫자 야구 게임</h1>
      <p>
        <strong>1~9까지의 수</strong>를 중복없이
        <strong>3개</strong> 입력해주세요. <br />
        올바른 예) 139 <br />
        틀린 예) 122
      </p>
      <InputForm
        ref={userInput}
        onSubmitInputForm={onSubmitInputForm}
        isGameSuccess={isGameSuccess}
      />
      <Result resultText={resultText} />
      <button id="game-restart-button" onClick={restart}>
        재시작
      </button>
    </div>
  );
}

export default App;
