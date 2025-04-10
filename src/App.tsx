import { useEffect, useState } from "react";
import "./App.css";
import ImageUpload from "./components/ImageUpload";
import { Route, Routes } from "react-router-dom";
import { login } from "./auth/auth";
import Callback from "./pages/Callback";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) setLoggedIn(true);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ImageUpload />} />
      <Route
        path="/auth"
        element={
          <div style={{ padding: "2rem" }}>
            <h1>PKCE Auth Example</h1>

            {loggedIn ? (
              <p>You are logged in ✅</p>
            ) : (
              <button onClick={login}>Login</button>
            )}
          </div>
        }
      />

      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
