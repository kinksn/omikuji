import { useEffect } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import { useOmikujiContext } from '../hook/useOmikujiContext';
import OmikujiMask from '/public/omikuji/tsutsu-mask.svg';
import OmikujiBox from '/public/omikuji/tsutsu.svg';
import Stick from '/public/omikuji/stick.svg';
import '../assets/style/omikuji.css';

type PorpsType = {
  deviceMotionHandler: (event: DeviceMotionEvent) => void;
}

export const Omikuji: React.FC<PorpsType> = ({ deviceMotionHandler = () => {} }) => {
  const {
    isSwing,
    isGameOver,
    setIsGameOver,
  } = useOmikujiContext();


  const handlePcSubmit = () => {
    isDesktop && setIsGameOver(true);
  }

  useEffect(() => {
    if(isSwing === 5) {
      const timer = setTimeout(() => {
        setIsGameOver(true);
      }, 4000);
      window.removeEventListener('devicemotion', deviceMotionHandler);
      return () => clearTimeout(timer);
    }
  }, [isSwing, setIsGameOver, deviceMotionHandler]);

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
        
        {isMobile && (
          <>
            {isSwing}
          </>
        )}
      </div>
    );
  }
  
}
