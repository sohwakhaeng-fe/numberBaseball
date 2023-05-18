import { useState } from "react";
import "./App.css";
import PlayerForm from "./components/PlayerForm";

 // 1. 2명의 플레이어가 함께 한다.
  // 2. 서로 랜덤의 숫자를 지정한다.
  // 3. 한 턴에 한번 숫자를 입력할 수 있다.
  // 4. 먼저 맞추는 쪽이 승리한다.
  // 5. 만약 먼저 시작한 쪽이 정답을 맞추면 상대방한테도 기회가 주어지고, 상대방도 맞추면 무승부

function App() {

  const [number, setNumber] = useState("");

  const [isNext, setIsNext] = useState(false);

  const [numbers, setNumbers] = useState([
    [],[]
  ]); 
  
  // [],[] : 첫 번째[]: 맞춰야하는값 배열, 두번째 [] : input에서 맞춰지는 값 배열
  // numbers[1][0] => red가 맞춰야 하는 값
  // numbers[0][0] => blue가 맞춰야 하는 값

  const [resultList, setResultList] = useState([])

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
    setResultList([])
  }

  const handleSubmit = (player, $event) => {
      $event.preventDefault()
      const value = $event.target[0].value;
      if (!checkValue(value)) return
      
      // 정답 입력하는 거
      const index = player === 'red' ? 0 : 1

      if (numbers[0].length !== 0 && numbers[1].length !== 0){
        matchNumber(numbers, player, value)
      }

      setNumbers(prev => {
        let newNumbers = [...prev];
        newNumbers[index].push(value)
        console.log(newNumbers);
        return newNumbers;
      })

      
  }

  const matchNumber = (numbers, player, value) => {
    const answer = numbers[player === "red" ? 1 : 0 ][0];

    console.log(answer);

    const result = {
      strike: 0,
      ball: 0
    }
    let i = 0;
    for (const n of value) {
      
      const index = answer.indexOf(n)
      if (index >= 0 && index === i) {
        result["strike"] += 1
      } else if (index >= 0) {
        result["ball"] += 1
      }
      i++;
    }

    console.log(result);
    
  }

  //  숫자 맞추기
  // const handleSubmit = e => {
  //   e.preventDefault()
  //   if (!checkValue(number)) return
    
  //   const result = {
  //     strike: 0,
  //     ball: 0
  //   }
  //   let i = 0;
  //   for (const n of number) {
      
  //     const index = randomNumber.indexOf(n)
  //     if (index >= 0 && index === i) {
  //       result["strike"] += 1
  //     } else if (index >= 0) {
  //       result["ball"] += 1
  //     }
  //     i++;
  //   }

  //   console.log(result);

  //   const resultText = resultToText(result)
    
  //   setResultList(prev => [
  //     ...prev,
  //     resultText
  //   ])
    
  //   console.log(randomNumber);
  //   console.log(result);
  // }
  return (
    <div id="app">
      <h1>⚾ 숫자 야구 게임</h1>
      <p>
        <strong>1~9까지의 수</strong>를 중복없이
        <strong>3개</strong> 입력해주세요. <br />
        올바른 예) 139 <br />
        틀린 예) 122
      </p>
      <div style={{display: "flex"}}>
        <PlayerForm player='red' onSubmit={handleSubmit} />
        <PlayerForm player='blue' onSubmit={handleSubmit} />
      </div>
      {/* <form onSubmit={handleSubmit}></form>
        <input readOnly={resultList[resultList.length - 1] === "3 스트라이크"} type="text" id="user-input" value={number} onChange={e => setNumber(e.target.value)}/>
        <button id="submit" onClick={handleSubmit}>확인</button>
      </form> */}
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
