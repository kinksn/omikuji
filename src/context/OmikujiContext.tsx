import { createContext, useState } from 'react';

const initOmikujiResult = {
  daikichi: '大吉',
  chukichi: '中吉',
  syokichi: '小吉',
  kichi: '吉',
  suekichi: '末吉',
  kyo: '凶',
  daikyo: '大凶',
}

type OmikujiResult = typeof initOmikujiResult;

type OmikujiContextType = {
  omikujiResult: OmikujiResult;
  setOmikujiResult: React.Dispatch<React.SetStateAction<OmikujiResult>>;
  isStart: boolean;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
  isSwing: number,
  setIsSwing: React.Dispatch<React.SetStateAction<number>>;
  isGameOver: boolean,
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const initOmikujiContext: OmikujiContextType = {
  omikujiResult: initOmikujiResult,
  setOmikujiResult: () => {},
  isStart: false,
  setIsStart: () => {},
  isSwing: 0,
  setIsSwing: () => {},
  isGameOver: false,
  setIsGameOver: () => {},
}

export const OmikujiContext = createContext<OmikujiContextType>(initOmikujiContext);

export const OmikujiProvider = ({ children }: { children: React.ReactNode }) => {
  const [omikujiResult, setOmikujiResult] = useState(initOmikujiResult);
  const [isStart, setIsStart] = useState(false);
  const [isSwing, setIsSwing] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const contextValues = {
    omikujiResult,
    setOmikujiResult,

    isStart,
    setIsStart,

    isSwing,
    setIsSwing,

    isGameOver,
    setIsGameOver,
  }

  return (
    <OmikujiContext.Provider value={contextValues}>
      {children}
    </OmikujiContext.Provider>
  );
};

