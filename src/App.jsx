import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { BackdoorData } from "./components/Home/Home";

function App() {
  return (
    <div className="bg-slate-300 text-black h-screen flex text-white">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <BackdoorData />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
