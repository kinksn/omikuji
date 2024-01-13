import { useContext } from 'react';
import { OmikujiContext } from '../context/OmikujiContext';

export const useOmikujiContext = () => useContext(OmikujiContext);