import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login as loginService } from "../services/AuthService";
import Alert from '../components/Alert';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setIsError('');


    try {
      const data = await loginService(email, password);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      localStorage.setItem('userId', payload.sub);

      navigate('/dashboard');
    } catch (error) {
      setAlertMessage(error.response?.data?.message || 'Error al iniciar sesión');
      setIsError(true)
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <a href="/register" style={{ fontSize: '12px', color: '#007BFF', textAlign: 'center', marginTop: '10px' }}>¿No tienes cuenta? Regístrate aquí</a>
      </form>
      {alertMessage && <Alert message={alertMessage} isError={isError} />}
    </div>
  )
}
export default Login