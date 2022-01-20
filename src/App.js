import teemo from './image/Teemo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={teemo} className="App-logo" alt="teemo" />
        <p>
          Tutaj <i>coś</i> powstanie.
        </p>
      </header>
    </div>
  );
}

export default App;
