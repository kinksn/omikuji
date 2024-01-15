import { Start } from './components/Start';
import { Result } from './components/Result';
import { useOmikujiContext } from './hook/useOmikujiContext';
import './App.css';

function App() {
  const { isGameOver } = useOmikujiContext();
  return (
    <div className='wrapper'>
      <div className='obi-top'></div>
      <div className='obi-bottom'></div>
      <Start />
      {isGameOver && <Result />}
    </div>
  );
}

export default App;
