import React, { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    // Race condition: no more than one decimal point in the input.
    if (value == '.' && input.includes('.')) { return; }

    const operators = ['+','-','/','*','.'];
    const lastValue = input[input.length - 1];
    const penultimateValue = input[input.length - 2];

    // We allow the '**' operator since that applies an exponent
    if ((value == '*') && (lastValue == '*') && (penultimateValue != '*')) {
      setInput(input + value);
    }
    else if (operators.includes(value) && operators.includes(lastValue)) {
      setInput(input.slice(0, -1) + value);
    }
    else {
      setInput(input + value);
    }
  };

  const handleEqual = () => {
    try {
      console.log('Evaluating', input);
      const output = eval(input).toString();
      setResult(output);
      setInput(output);
    }
    catch (error) {
      console.log('Error');
      setResult('Error');
      setInput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1))
  }

  return (
    <div className="calculator">
      <div className="display">{input || result || '0'}</div>
      <div className="buttons">
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleEqual()}>=</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClear()}>Clear</button>
        <button onClick={() => handleDelete()}>Del</button>
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>
      </div>
    </div>
  )
}

export default Calculator;
