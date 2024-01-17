import { useEffect, useRef } from 'react';
import { Start } from './components/Start';
import { Result } from './components/Result';
import { fortunes, Fortune } from './assets/data/fortune';
import { useOmikujiContext } from './hook/useOmikujiContext';
import './App.css';

const selectFortune = (fortunes: Fortune[]): string => {
  const totalWeight = fortunes.reduce((acc, fortune) => acc += fortune.weight, 0);
  let randomNum = Math.floor(Math.random() * totalWeight);

  for (const fortune of fortunes) {
    if (randomNum < fortune.weight) {
      return fortune.image;
    }
    randomNum -= fortune.weight;
  }

  return 'Error';
}

function App() {
  const { isGameOver } = useOmikujiContext();
  const resultFortune = useRef('');
  useEffect(() => {
    resultFortune.current = selectFortune(fortunes);
  }, [isGameOver])
  return (
    <div className='wrapper'>
      <div className='obi-top'></div>
      <div className='obi-bottom'></div>
      <Start />
      {isGameOver && <Result fortuneResult={resultFortune.current} />}
    </div>
  );
}

export default App;
