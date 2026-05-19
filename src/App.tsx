import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route
        path="/notes"
        element={
          token ? <Notes setToken={setToken} /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
