import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container-navbar">
      <div>
        <h4>
          <i className="fa-solid fa-lock"></i> 0OHM Admin
        </h4>
        <p>{user.displayName || user.email}</p>
      </div>
      <div>
        <a onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
        </a>
      </div>
    </div>
  );
}
