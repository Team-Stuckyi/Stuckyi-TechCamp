import React from 'react';
import Counter from './Components/Counter';
import Info from './Components/Info';
import InfoUseEffect from './Components/InfoUseEffect';

const App = () => {
  return (
    <>
      <h1>Counter.js</h1>
      <Counter />
      <h1>Info.js (only useState)</h1>
      <Info />
      <h1>Info.js (useEffect)</h1>
      <InfoUseEffect />
    </>
  );
};

export default App;