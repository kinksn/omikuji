export type Fortune = {
  name: string;
  image: string;
  weight: number;
};

export const fortunes: Fortune[] = [
  { name: '大吉', image: '/public/result/daikichi.png', weight: 10 },
  { name: '中吉', image: '/public/result/chukichi.png', weight: 30 },
  { name: '吉', image: '/public/result/kichi.png', weight: 50 },
  { name: '小吉', image: '/public/result/suekichi.png', weight: 70 },
  { name: '末吉', image: '/public/result/suekichi.png', weight: 80 },
  { name: '凶', image: '/public/result/kyo.png', weight: 15 },
  { name: '大凶', image: '/public/result/daikyo.png', weight: 5 }
];