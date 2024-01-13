export type Fortune = {
  name: string;
  weight: number;
};

export const fortunes: Fortune[] = [
  { name: '大吉', weight: 10 },
  { name: '中吉', weight: 30 },
  { name: '吉', weight: 50 },
  { name: '小吉', weight: 70 },
  { name: '末吉', weight: 80 },
  { name: '凶', weight: 15 },
  { name: '大凶', weight: 5 }
];