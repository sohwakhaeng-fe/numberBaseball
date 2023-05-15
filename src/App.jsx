import "./App.css";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState();

  const handleChange = ({ target: { value } }) => {
    setNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <input type="text" id="user-input" onChange={handleChange} value={number} />
        <button id="submit">확인</button>
      </form>
      <h3>📄 결과</h3>
      <div id="result">1볼 1스트라이크</div>
      <button id="game-restart-button">재시작</button>
    </div>
  );
}

export default App;
