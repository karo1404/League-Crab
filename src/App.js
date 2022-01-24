import logo from "./images/crab-logo-white.svg";
import "./App.css";
import { LanguageProvider } from "./providers/Language";
import Text from "./components/Text";

//const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <header className="p-5 m-5 image-fluid">
          <img
            src={logo}
            className="App-logo"
            style={{ width: "25rem" }}
            alt="logo"
          />
        </header>
        <p>
          <Text textId="welcomeTo" /> <Text textId="appName" />!
        </p>
      </div>
    </LanguageProvider>
  );
}

export default App;
