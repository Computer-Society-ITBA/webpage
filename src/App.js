import logo from './logo.svg';
import './index.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header bg-brand_primary">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-typography_primary">
          Welcome to CS ITBA!
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
    </div>
  );
}

export default App;
