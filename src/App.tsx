import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import BlurCheck from "./pages/BlurCheck";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="blur-check" element={<BlurCheck />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
