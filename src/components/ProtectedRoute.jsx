import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6em",
  };
              
  if (loading)
    return (
      <div>
        <div style={center}>
          <h1>Cargando..</h1>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
