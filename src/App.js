import React from 'react';
import './App.css';
import Reader from './Reader'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CSV parser
        </p>
        <Reader />
      </header>
    </div>
  );
}

export default App;
