
import {useState} from 'react'

function App() {

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button>{i}</button>
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
    return digits;
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span>(0)</span>
        </div>

        <div className="operators">
          <button>/</button>
          <button>*</button>
          <button>+</button>
          <button>-</button>

          <button>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button>0</button>
          <button>.</button>
          <button>=</button>
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
