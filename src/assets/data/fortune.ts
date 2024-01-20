import Daikichi from '/public/result/daikichi.png';
import Chukichi from '/public/result/chukichi.png';
import Kichi from '/public/result/kichi.png';
import Shokichi from '/public/result/syokichi.png';
import Suekichi from '/public/result/suekichi.png';
import Kyo from '/public/result/kyo.png';
import Daikyo from '/public/result/daikyo.png';

export type Fortune = {
  name: string;
  image: string;
  weight: number;
};

export const fortunes: Fortune[] = [
  { name: '大吉', image: Daikichi, weight: 25 },
  { name: '中吉', image: Chukichi, weight: 30 },
  { name: '吉', image: Kichi, weight: 50 },
  { name: '小吉', image: Shokichi, weight: 60 },
  { name: '末吉', image: Suekichi, weight: 70 },
  { name: '凶', image: Kyo, weight: 10 },
  { name: '大凶', image: Daikyo, weight: 5 }
];