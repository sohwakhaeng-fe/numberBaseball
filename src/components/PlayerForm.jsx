import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function PlayerForm({ player, onSubmit }) {

    const [value, setValue] = useState("");
    
  return (
    <form onSubmit={(e) => onSubmit(player, e)}>
      <p>{player}</p>
        <input type="text" id="user-input"  value={value} onChange={(e) => setValue(e.target.value)}/>
        <button id="submit">확인</button>
    </form>
  )
}
