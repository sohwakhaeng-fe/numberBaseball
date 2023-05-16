import "./App.css";
import { useState, useRef } from "react";

const getAnswerNumbers = () => {
  const answerNumbers = [];
  while (answerNumbers.length < 3) {
    // eslint-disable-next-line
    const randomNumber = MissionUtils.Random.pickNumberInRange(1, 9);
    if (!answerNumbers.includes(randomNumber)) {
      answerNumbers.push(randomNumber);
    }
  }
  return answerNumbers;
};

function App() {
  const [value, setValue] = useState();
  const [answer, setAnswer] = useState(getAnswerNumbers());
  const [result, setResult] = useState("");
  const [count, setCount] = useState({ strike: 0, ball: 0, });
  const inputRef = useRef(null);

  const handleChangeInput = ( { target: { value } } ) => {
    setValue(value);
  };

  // 결과계산
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`computer: ${answer} `);
    console.log(`answer: ${answer.join("")} | input: ${value}`);

    if (answer.join("") === value) {
      setResult("정답입니다!");
    } else {
      const answerArr = value.split("").map((v) => parseInt(v));
      for (let i = 0; i < 3; i++) {
        if (answerArr[i] === answer[i]) {
          console.log("strike", answerArr[i], answer[i]);
          setCount(count.strike++);
        } else if (answer.includes(answerArr[i])) {
          console.log("ball", answerArr[i], answer.indexOf(answerArr[i]));
          setCount(count.ball++);
        }
      }
      setResult(`${count.ball}볼, ${count.strike}스트라이크`);
      setValue("");
      setCount({ strike: 0, ball: 0 });
      if(count.strike === 0 && count.ball === 0) {
      setResult("낫싱");
      }
      
      inputRef.current.focus();
    }
  };

  const resetGame = () => {
    setResult("");
    setValue("");
    setAnswer(getAnswerNumbers());
    inputRef.current.focus();
    setCount({ strike: 0, ball: 0 });
  };

  return (
    <div id="app">
      <h1>⚾ 숫자 야구 게임</h1>
      <p>
        <strong>1~9까지의 수</strong>를 중복없이
        <strong> 3개</strong> 입력해주세요. <br />
        올바른 예) 139 <br />
        틀린 예) 122
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="user-input"
          onChange={handleChangeInput}
          value={value}
          ref={inputRef}
        />
        <button id="submit" className="button">
          확인
        </button>
      </form>
      <div id="result-wrapper">
        <h3>📄 결과</h3>
        {result === "정답입니다!" ? (
          <button className="button" onClick={resetGame}>
            재시작
          </button>
        ) : (
          <></>
        )}
      </div>
      <div id="result">{result}</div>
    </div>
  );
}

export default App;
