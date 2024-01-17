import { useEffect } from 'react';
// @ts-expect-error because the useSound library doesn't have TypeScript support
import useSound from 'use-sound';
import KarakaraSound from '/public/sound/karakara.mp3';
import { isDesktop } from 'react-device-detect';
import { useOmikujiContext } from '../hook/useOmikujiContext';
import OmikujiMask from '/public/omikuji/tsutsu-mask.svg';
import OmikujiBox from '/public/omikuji/tsutsu.svg';
import Stick from '/public/omikuji/stick.svg';
import '../assets/style/omikuji.css';

type PorpsType = {
  deviceMotionHandler: (event: DeviceMotionEvent) => void;
}

export const Omikuji: React.FC<PorpsType> = ({ deviceMotionHandler = () => {} }) => {
  const [play] = useSound(KarakaraSound);
  const {
    isSwing,
    isGameOver,
    setIsGameOver,
  } = useOmikujiContext();


  const handlePcSubmit = () => {
    isDesktop && setIsGameOver(true);
  }

  useEffect(() => {
    if(isSwing === 3) {
      const timer = setTimeout(() => {
        setIsGameOver(true);
      }, 4000);
      window.removeEventListener('devicemotion', deviceMotionHandler);
      return () => clearTimeout(timer);
    }
  }, [isSwing, setIsGameOver, deviceMotionHandler]);

  useEffect(() => {
    if(isSwing === 1 || isSwing === 2 || isSwing === 3) {
      play();
    }
  }, [isSwing, play]);

  if (!isGameOver) {
    return (
      <div className='omikuji-wrapper'>
        <div className={`omikuji-blind is-blind-${isSwing}`}></div>
        <div className="omikuji-container">
          <div onClick={handlePcSubmit} className={`omikuji-box-container is-swing-${isSwing}`}>
            <img className='omikuji-box' src={OmikujiBox} alt="" />
            <img className={`omikuji-stick omikuji-stick-${isSwing}`} src={Stick} alt="" />
            <img className='omikuji-mask' src={OmikujiMask} alt="" />
          </div>
        </div>
      </div>
    );
  }
  
}
