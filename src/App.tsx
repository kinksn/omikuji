import { useState, useEffect, useCallback } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import { useOmikujiContext } from './hook/useOmikujiContext';
import { fortunes, Fortune } from './assets/data/fortune';

import './App.css';

declare global {
  interface Window {
    DeviceMotionEvent: DeviceMotionEvent;
  }

  interface DeviceMotionEvent {
    requestPermission?: () => Promise<PermissionState>;
  }
}

function App() {
  const [arrow, setArrow] = useState(false);
  const {
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
    let randomNum = Math.random() * totalWeight;
  
    for (const fortune of fortunes) {
      if (randomNum < fortune.weight) {
        return fortune.name;
      }
      randomNum -= fortune.weight;
    }
  
    return 'Error'; // 何らかのエラーが発生した場合
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
    setArrow(true);
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
    <>
      {!arrow && <button onClick={handleGameStart}>ゲームスタート</button>}
      {isMobile && arrow && (
        <>
          {isSwing}
          {isGameOver && selectFortune(fortunes) }
        </>
      )}
      {isDesktop && arrow && (
        <>
          <button onClick={handlePcSubmit}>おみくじを引く</button>
          {isGameOver && selectFortune(fortunes) }
        </>
      )}
    </>
  );
}

export default App;
