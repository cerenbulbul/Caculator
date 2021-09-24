
import { useState, useEffect } from 'react'

function App() {

  const [getCalc, setCalc] = useState("");
  const [getResult, setResult] = useState("");
  const [getHistorry, setHistory] = useState([]);

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalculate = value => {
    if (ops.includes(value) && getCalc === '' ||
      ops.includes(value) && ops.includes(getCalc.slice(-1))) {
      return;
    }

    setCalc(getCalc + value)

    if (!ops.includes(value)) {
      setResult(eval(getCalc + value).toString());
    }
  }

  const showCalculate = () => {
    setCalc(eval(getCalc).toString())
    
  }

  const deleteLast = () => {
    if (getCalc === '') {
      return;
    }
    const value = getCalc.slice(0, -1);

    setCalc(value)
  }


  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalculate(i.toString())}>{i}</button>
      )
    }
    return digits;
  }


  const showHistory = () => {
    const digits = [];

    for (let i = 0; i < 10; i++) {
      digits.push(
        <p>{i}</p>
      )
    }
    return getHistorry;
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {getResult ? <span>({getResult})</span> : ''}&nbsp;
          {getCalc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalculate('/')}>/</button>
          <button onClick={() => updateCalculate('*')}>*</button>
          <button onClick={() => updateCalculate('+')}>+</button>
          <button onClick={() => updateCalculate('-')}>-</button>

          <button onClick={() => deleteLast()}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalculate('0')}>0</button>
          <button onClick={() => updateCalculate('.')}>.</button>
          <button onClick={() => showCalculate()}>=</button>
        </div>
      </div>

      <div className="history">
        <h2>History</h2>

        <div className="history-show">
          {showHistory()}
        </div>

      </div>
    </div>
  );
}

export default App;
