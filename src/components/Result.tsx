import { useEffect } from 'react';
import { fortunes, Fortune } from '../assets/data/fortune';
// @ts-expect-error because the useSound library doesn't have TypeScript support
import useSound from 'use-sound';
import ResultSound from '/public/sound/result.mp3';
import '../assets/style/result.css';

export const Result = () => {
  const [play] = useSound(ResultSound);

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

  useEffect(() => {
    setTimeout(() => {
      play();
    }, 600)
  }, [play]);

  return (
    <div className='result-wrapper'>
      <div className='result-blind'></div>
      <img className='result-image' src={selectFortune(fortunes)} />
    </div>
  );
}
