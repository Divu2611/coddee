import React from 'react';
import logo from './logo.svg';
import './App.css';

import Title from './components/title';
import CodeEditor from './components/codeEditor';

function App() {
  return (
    <React.Fragment>
      <Title />
      <CodeEditor />
    </React.Fragment>
  );
}

export default App;
