
import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const socket = io("http://localhost:3001/");


function App() {

  const [getCalc, setCalc] = useState("");
  const [getResult, setResult] = useState("");
  const [getHistorry, setHistory] = useState([]);
  const ops = ['/', '*', '+', '-', '.'];

  useEffect(() => {
    getHistoryData();
  }, []);

  const getHistoryData = () => {
    socket.on('output-history', data => {
      const result = [];
      if (data.length) {
        data.forEach(calc => {
          result.push(calc.calculator)
        });
      }
      result.reverse();
      setHistory(result)
    })
  }

  const updateCalculate = value => {
    if (ops.includes(value) && getCalc === '' ||
      ops.includes(value) && ops.includes(getCalc.slice(-1))) {
      return;
    }
    setCalc(getCalc + value)
    setResult(getCalc + value);
    
  }

  function parseCalculationString(s) {
    var calculation = [],
      current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
      if ('^*/+-'.indexOf(ch) > -1) {
        if (current == '' && ch == '-') {
          current = '-';
        } else {
          calculation.push(parseFloat(current), ch);
          current = '';
        }
      } else {
        current += s.charAt(i);
      }
    }
    if (current != '') {
      calculation.push(parseFloat(current));
    }
    return calculation;
  }

  function calculate(calc) {
    var ops = [{ '^': (a, b) => Math.pow(a, b) },
    { '*': (a, b) => a * b, '/': (a, b) => a / b },
    { '+': (a, b) => a + b, '-': (a, b) => a - b }],
      newCalc = [],
      currentOp;
    for (var i = 0; i < ops.length; i++) {
      for (var j = 0; j < calc.length; j++) {
        if (ops[i][calc[j]]) {
          currentOp = ops[i][calc[j]];
        } else if (currentOp) {
          newCalc[newCalc.length - 1] =
            currentOp(newCalc[newCalc.length - 1], calc[j]);
          currentOp = null;
        } else {
          newCalc.push(calc[j]);
        }
      }
      calc = newCalc;
      newCalc = [];
    }
    if (calc.length > 1) {
      console.log('Error: unable to resolve calculation');
      return calc;
    } else {
      return calc[0];
    }
  }

  const showCalculate = () => {
    let result = calculate(parseCalculationString(getCalc))
    socket.emit('history', result.toString())
    window.location.reload();
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
    const showhistory = [];
    let lenght = 0;

    if (getHistorry.length < 10) {
      lenght = getHistorry.length
    }
    else {
      lenght = 10;
    }
    for (let i = 0; i < lenght; i++) {
      showhistory.push(
        <pre className="history-items" key={i}>{getHistorry[i]}</pre>
      )
    }
    return showhistory;
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
          <button onClick={() => { showCalculate(); }}>=</button>
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

