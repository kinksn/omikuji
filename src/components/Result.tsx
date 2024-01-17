import { useEffect } from 'react';
// @ts-expect-error because the useSound library doesn't have TypeScript support
import useSound from 'use-sound';
import ResultSound from '/public/sound/result.mp3';
import '../assets/style/result.css';

type PropsType = {
  fortuneResult: string;
}

export const Result: React.FC<PropsType> = ({ fortuneResult }) => {
  const [play] = useSound(ResultSound);

  useEffect(() => {
    setTimeout(() => {
      play();
    }, 600)
  }, [play]);

  return (
    <div className='result-wrapper'>
      <div className='result-blind'></div>
      <img className='result-image' src={fortuneResult} />
    </div>
  );
}
