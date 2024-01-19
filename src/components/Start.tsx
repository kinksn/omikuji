import { useCallback, useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// @ts-expect-error because the useSound library doesn't have TypeScript support
import useSound from 'use-sound';
import { isMobile } from 'react-device-detect';
import { useOmikujiContext } from '../hook/useOmikujiContext';
import { Omikuji } from '../components/Omikuji';
import StartSound from '/public/sound/start.mp3';
import '../assets/style/start.css';
import StartButton from '/public/top/start-button.svg';
import Title from '/public/top/title.svg';
import TreeRight from '/public/top/tree-right.svg';
import TreeLeft from '/public/top/tree-left.svg';
import OmikujiBox from '/public/top/omikuji.svg';
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
    setIsSwing,
  } = useOmikujiContext();
  // const { contextSafe } = useGSAP();
  const [playStart] = useSound(StartSound);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const deviceMotionHandler = useCallback((event: DeviceMotionEvent) => {
    // X軸とY軸の加速度
    const x = event.acceleration?.x ?? 0;
    const y = event.acceleration?.y ?? 0;
  
    // 加速度のしきい値
    const threshold = 5;
    // デバウンス時間（ミリ秒）
    const debounceTime = 70;
  
    // 加速度がしきい値を超えた場合のみ処理
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      // 既存のタイマーをクリア
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // 新しいタイマーを設定
      debounceTimer.current = setTimeout(() => {
        setIsSwing(c => c + 1);
      }, debounceTime);
    }
  }, [setIsSwing]);

  const permissionDeviceMotionEvent = () => {
    if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
      // ダイアログを表示して許可を求める
      window.DeviceMotionEvent.requestPermission()
        .then((permissionState: PermissionState) => {
          if (permissionState === 'granted') {
            // 許可された場合、イベントリスナーを設定
            window.addEventListener('devicemotion', deviceMotionHandler);
          } else {
            console.log('加速度センサーへのアクセスが拒否されました');
          }
        })
        .catch(console.error);
    } else {
      // オートパーミッションモデルを使用する古いブラウザ
      window.addEventListener('devicemotion', deviceMotionHandler);
    }
  };

  const handleGameStart = () => {
    playStart();
    if (isMobile) permissionDeviceMotionEvent();
    setIsStart(true);
  };

  const footWrapper = useRef();
  useGSAP(() => {
    const tl = gsap.timeline({ scope: footWrapper });
  
    tl.to('.pipi', {
      y: 12,
      rotate: 2,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  
    tl.to('.omikuji', {
      y: 4,
      x: 2,
      z: 2,
      rotation: 4,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "elastic.out(1,0.3)"
    });
  
  }, [isStart]);

  if (!isStart) {
    return (
      <div className='start-wrapper'>
        <div className="clowd-wrapper">
          <img src={Cloud} className="clowd-left" alt="" />
          <img src={Cloud} className="clowd-right" alt="" />
        </div>
        <div className="title-wrapper">
          <img className="title-image" src={Title} alt="" />
        </div>
        <div className="tree-wrapper">
          <img src={TreeLeft} className="tree-right" alt="" />
          <img src={TreeRight} className="tree-left" alt="" />
        </div>
        <div className="start-button-wrapper">
          <img src={StartButton} className='start-button' onClick={handleGameStart}/>
        </div>
        <div className="foot-wrapper">
          <img src={OmikujiBox} className="omikuji" alt="" />
          <img src={Pipi} className="pipi" alt="" />
        </div>
      </div>
    );
  } else {
    return <Omikuji deviceMotionHandler={deviceMotionHandler} />
  }
}
