import { useState } from "react";
import "./App.css";

function App() {

  const [number, setNumber] = useState("");

  const [resultList, setResultList] = useState([])
  // 번호 생성
  const createNumber = () => {
    let numberArr = []
    while (numberArr.length < 3) {
      const num = Math.floor(Math.random() * 9 + 1)
      if (!numberArr.includes(num)){
        numberArr.push(num)
      }
    }
    return numberArr.join("")
  }

  const [randomNumber, setRandomNumber] = useState(createNumber())
  // 결과 텍스트 변환
  const resultToText = (result) => {
    let resultText = ""
    if (result.strike && result.ball) {
      resultText = `${result.strike} 스트라이크 ${result.ball} 볼`
    } else if (result.strike) {
      resultText = `${result.strike} 스트라이크`
    } else if (result.ball) {
      resultText = `${result.ball} 볼`
    } else {
      resultText = '낫싱'
    }
    return resultText;
  }

  // 값 체크
  const checkValue = (number) => {
    const size = new Set(number).size;
    try {
      if (number === "") {
        throw new Error("숫자를 입력해주세요!")
      } else if (number.length > 3) {
        throw new Error("3자리 수를 입력해주세요!")
      } else if (size < 3) {
        throw new Error("중복 숫자입니다!")
      } else if (number.indexOf("0") !== -1) {
        throw new Error("1 ~ 9까지의 수를 입력해주세요!")
      }
    } catch (err) {
      alert(err.message)
      reset()
      return false
    }
    return true
  }
  // 재시작
  const reset = () => {
    setNumber("");
    setRandomNumber(createNumber())
    setResultList([])
  }
  // 숫자 맞추기
  const handleSubmit = e => {
    e.preventDefault()
    if (!checkValue(number)) return
    
    const result = {
      strike: 0,
      ball: 0
    }
    let i = 0;
    for (const n of number) {
      
      const index = randomNumber.indexOf(n)
      if (index >= 0 && index === i) {
        result["strike"] += 1
      } else if (index >= 0) {
        result["ball"] += 1
      }
      i++;
    }

    console.log(result);

    const resultText = resultToText(result)
    
    setResultList(prev => [
      ...prev,
      resultText
    ])
    
    console.log(randomNumber);
    console.log(result);
  }
  return (
    <div id="app">
      <h1>⚾ 숫자 야구 게임</h1>
      <p>
        <strong>1~9까지의 수</strong>를 중복없이
        <strong>3개</strong> 입력해주세요. <br />
        올바른 예) 139 <br />
        틀린 예) 122
      </p>
      <form onSubmit={handleSubmit}>
        <input readOnly={resultList[resultList.length - 1] === "3 스트라이크"} type="text" id="user-input" value={number} onChange={e => setNumber(e.target.value)}/>
        <button id="submit" onClick={handleSubmit}>확인</button>
      </form>
      <h3>📄 결과</h3>
      {resultList.map((result, index) => {
        if (result === '3 스트라이크') return <div key={index}>정답 입니다!</div>
        return <div key={index}>{result}</div>
      })}
      {/* 더이상 게임 진행 X */}
      {}
      
      <button id="game-restart-button" onClick={reset}>재시작</button>
    </div>
  );
}

export default App;
