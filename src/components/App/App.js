import React from 'react';

import './style.css';

import Desk from '../Desk';

const App = ({ sections, setSections }) => (
  <div className="app">
    <header>
      <h2>JavaScript Ninja Desk</h2>
    </header>
    <Desk onChange={setSections} sections={sections} />
  </div>
);

export default App;
