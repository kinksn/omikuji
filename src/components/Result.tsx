import { fortunes, Fortune } from '../assets/data/fortune';
import '../assets/style/result.css';

export const Result = () => {

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
  return (
    <div className='result-wrapper'>
      <div className='result-blind'></div>
      <img className='result-image' src={selectFortune(fortunes)} />
    </div>
  );
}
