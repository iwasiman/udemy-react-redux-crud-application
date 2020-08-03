import React from 'react';

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>Hello, React World! my first application!! Now learning JSX.</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      <input type="text" className="foo" onClick={() => {console.log('clicked!')}} />
      <input type="text" className="foo" onClick={function(){console.log('old func. clicked!')}} />
    </React.Fragment>
  );
}

export default App;
