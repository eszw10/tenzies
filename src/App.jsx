import { useEffect, useState } from "react"
import Dice from "./components/Dice"
import { nanoid } from "nanoid"
import ReactConfetti from "react-confetti"

function App() {
  const[dice, setDice] = useState(allNewDice())
  const[tenzies, setTenzies] = useState(false)
  const[rollTracker, setRollTracker] = useState(0)
  const[startTime, setStartTime] = useState({
    isClicked : false,
    value : null
  })
  const[endTime, setEndTime] = useState(null)
  const[bestTime, setBestTime] = useState(()=>localStorage.getItem('bestTime') || '')
  const[userTime, setUserTime] = useState(null)
  

  useEffect(()=> {
    const allHeld = dice.every(item => item.isHeld)
    const firstVal = dice[0].value
    const allSame = dice.every(item => item.value === firstVal)
    if(allHeld && allSame) {
      setEndTime(Date.now())
      setTenzies(true)
    }
  } , [dice])

  useEffect(() => {
    if (startTime.value && endTime) {
      const timeDifference = endTime - startTime.value;
      setUserTime(timeDifference)
      if (timeDifference < bestTime || bestTime === '') {
        setBestTime(timeDifference);
        localStorage.setItem('bestTime', timeDifference);
      }
    }
  }, [endTime]);

  useEffect(() => {
    if (tenzies) {
      setEndTime(null);
      setStartTime({
        isClicked: false,
        value : null
      })
    }
  }, [tenzies]);

  function allNewDice() {
    const arr = []
    for(let i = 0;i< 10;i++) {
      arr.push({
        value : Math.ceil(Math.random()*6),
        isHeld : false,
        id : nanoid()
      })
    }
    return arr
  }

  function rollDice() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRollTracker(0)
      setUserTime(null)
    } else {
      setDice(prevDices => prevDices.map(dices => dices.isHeld? dices : {
        value : Math.ceil(Math.random()*6),
        isHeld : false,
        id : nanoid() 
      }))
      setRollTracker(prev => prev + 1)
      setStartTime(prevTime => {
        if(prevTime.isClicked) {
          return {
            ...prevTime
          }
        } else {
          return {
            isClicked : true,
            value : Date.now()
          }
        }
      })
    }
  }

  function handleClick(diceId) {
    setDice(prevDices => prevDices.map(dices => dices.id === diceId ? {
      ...dices,
      isHeld : !dices.isHeld
    } : dices))
  }

  return (
    <div className='app-container'>
      {tenzies && <ReactConfetti width={innerWidth} height={innerHeight}/>}
      <div className="game-container">
        <div className="tenz-container">
          <h2 style={{fontWeight:700, fontFamily:'Karla', fontSize:40}}>Tenzies</h2>
          <p style={{marginBottom: '20px', color:'#4A4E74'}}>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dice-container">
            {dice.map(item => <Dice key={item.id} id={item.id} value={item.value} isHeld={item.isHeld} handleClick={()=> handleClick(item.id)}/>)}
          </div>
          <button className="btn" onClick={rollDice}>{tenzies? 'New Game' : 'Roll'}</button>
          <p style={{marginTop:'10px'}}>Button Roll Clicked : {rollTracker} times</p>
          <p>Your time : {Math.floor(userTime / 1000)} seconds</p>
          <p style={{fontWeight:'bold'}}>Best Time: {bestTime !== '' ? Math.floor(bestTime / 1000) + " seconds" : "No record yet"}</p>
        </div>
      </div>
      <h2 style={{fontFamily:'Karla'}}>Created by : Erycson Z.W</h2>
      <p>Inspired by Scrimba</p>
    </div>
  )
}

export default App
