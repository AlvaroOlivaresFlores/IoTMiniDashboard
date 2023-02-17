import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../Alert";
import Logo from "../../assets/logo-full-white.png";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Escribe tu correo para reiniciar la contraseña");
    try {
      await resetPassword(user.email);
      setError("Te enviamos un Email. Revisa tu correo.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="center">
        <div className="div-img">
          <img src={Logo} alt="" />
        </div>
        <div className="div-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="email@0ohm.cl"
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="*************"
              />
            </div>

            <div>
              <button type="submit">Iniciar Sesion</button>
              <a href="#!" onClick={handleResetPassword}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            {error && <Alert message={error} />}
          </form>
        </div>
      </div>
    </div>
  );
}
