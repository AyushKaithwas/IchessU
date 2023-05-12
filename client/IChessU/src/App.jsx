import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./scenes/Homepage";
import Code from "./scenes/Code";
import Play from "./scenes/Play";
import Game from "./scenes/Game";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/code" element={<Code />}></Route>
          <Route path="/play" element={<Play />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
