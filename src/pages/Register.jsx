import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { register, register as registerService } from "../services/AuthService";
import Alert from '../components/Alert';

// Register funcionando
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage('');
    setIsError('');



    try {

      const data = await registerService(username, email, password);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      localStorage.setItem('userId', payload.sub);

      navigate('/dashboard');

    } catch (error) {
      if (error.response && error.response.status === 500) {
        setAlertMessage('Error del servidor. Es posible que el usuario o email ya existan.');
      } else {
        setAlertMessage(error.response?.data?.message || 'Error al crear nuevo usuario');
      }
      setIsError(true)
    }

  }
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Registrar</button>
        <a href="/login" style={{ fontSize: '12px', color: '#007BFF', textAlign: 'center', marginTop: '10px' }}>¿Ya tienes cuenta? Inicia sesión</a>
      </form>
      {alertMessage && <Alert message={alertMessage} isError={isError} />}
    </div>

  )
}

export default Register;