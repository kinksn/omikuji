import { useEffect, useCallback } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import { useOmikujiContext } from '../hook/useOmikujiContext';
import { fortunes, Fortune } from '../assets/data/fortune';
import '../assets/style/start.css';
import StartButton from '/public/top/start-button.svg';
import Title from '/public/top/title.svg';
import TreeRight from '/public/top/tree-right.svg';
import TreeLeft from '/public/top/tree-left.svg';
import Omikuji from '/public/top/omikuji.svg';
import Pipi from '/public/top/pipi.svg';
import Cloud from '/public/top/cloud.svg';

declare global {
  interface Window {
    DeviceMotionEvent: DeviceMotionEvent;
  }

  interface DeviceMotionEvent {
    requestPermission?: () => Promise<PermissionState>;
  }
}

export const Start = () => {
  const {
    isStart,
    setIsStart,
    isSwing,
    setIsSwing,
    isGameOver,
    setIsGameOver,
  } = useOmikujiContext();

  const devicemotionHandler = useCallback((event: DeviceMotionEvent) => {
    // X軸
    const x = event.acceleration?.x ?? null;
    // Y軸
    const y = event.acceleration?.y ?? null;

    const l = 5;
    if (x !== null && y !== null) {
      if (x > l) {
        setIsSwing((c) => c + 1);
      } else if (x < -l) {
        setIsSwing((c) => c + 1);
      } else if (y > l) {
        setIsSwing((c) => c + 1);
      } else if (y < -l) {
        setIsSwing((c) => c + 1);
      } else {
        return;
      }
    }
  }, [setIsSwing]);

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
  

  const permissionDeviceMotionEvent = () => {
    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
      // ダイアログを表示して許可を求める
      window.DeviceMotionEvent.requestPermission()
        .then((permissionState: PermissionState) => {
          if (permissionState === 'granted') {
            // 許可された場合、イベントリスナーを設定
            window.addEventListener('devicemotion', devicemotionHandler);
          } else {
            console.log('加速度センサーへのアクセスが拒否されました');
          }
        })
        .catch(console.error);
    } else {
      // オートパーミッションモデルを使用する古いブラウザ
      window.addEventListener('devicemotion', devicemotionHandler);
    }
  };

  const handleGameStart = () => {
    if (isMobile) permissionDeviceMotionEvent();
    setIsStart(true);
  };

  const handlePcSubmit = () => {
    setIsGameOver(true);
  }

  useEffect(() => {
    if(isSwing > 70) {
      setIsGameOver(true);
      window.removeEventListener('devicemotion', devicemotionHandler);
    }
  }, [isSwing, setIsGameOver, devicemotionHandler]);

  return (
    <div className='start-wrapper'>
      <div className="clowd-wrapper">
        <img src={Cloud} className="clowd-left" alt="" />
        <img src={Cloud} className="clowd-right" alt="" />
      </div>
      <div className="title-wrapper">
        <img src={Title} alt="" />
      </div>
      <div className="tree-wrapper">
        <img src={TreeLeft} className="tree-right" alt="" />
        <img src={TreeRight} className="tree-left" alt="" />
      </div>
      <div className="start-button-wrapper">
        <img src={StartButton} className='start-button' onClick={handleGameStart}/>
      </div>
      <div className="foot-wrapper">
        <img src={Omikuji} className="omikuji" alt="" />
        <img src={Pipi} className="pipi" alt="" />
      </div>
      {isMobile && isStart && (
        <>
          {isSwing}
          {isGameOver && <img src={selectFortune(fortunes)} /> }
        </>
      )}
      {isDesktop && isStart && (
        <>
          <button onClick={handlePcSubmit}>おみくじを引く</button>
          {isGameOver && <img src={selectFortune(fortunes)} /> }
        </>
      )}
    </div>
  );
}
