import { useEffect } from 'react';
import { useOmikujiContext } from '../hook/useOmikujiContext';
// @ts-expect-error because the useSound library doesn't have TypeScript support
import useSound from 'use-sound';
import RestartButton from '/public/result/restart-button.svg';
import ResultSound from '/public/sound/result.mp3';
import '../assets/style/result.css';

type PropsType = {
  fortuneResult: string;
}

export const Result: React.FC<PropsType> = ({ fortuneResult }) => {
  const { setIsGameOver, setIsStart, setIsSwing } = useOmikujiContext();
  const [play] = useSound(ResultSound);

  const handleReset = () => {
    setIsSwing(0);
    setIsStart(false);
    setIsGameOver(false);
  }

  useEffect(() => {
    setTimeout(() => {
      play();
    }, 600)
  }, [play]);

  return (
    <div className='result-wrapper'>
      <div className='result-blind'></div>
      <img
        className='result-image'
        src={fortuneResult}
      />
      <div className='result-button-container'>
        <img src={RestartButton} onClick={handleReset} alt="" className="result-restart-button" />
      </div>
    </div>
  );
}
