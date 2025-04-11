import "./App.css";
import { Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
