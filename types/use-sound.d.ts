declare module 'use-sound' {
  export default function useSound(
    src: string,
    options?: { [key: string]: any }
  ): [() => void, { stop: () => void }];
}