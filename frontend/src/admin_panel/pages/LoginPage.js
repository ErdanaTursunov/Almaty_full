import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../services/api';
import { useAuth } from '../../store/authContext';
import "../styles/Form.css"

const LoginPage = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('password');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchLogin(email, password);

      // Проверка, что данные содержат необходимые свойства
      if (data && data.token && data.admin) {
        login(data.token, data.admin);

        if (data.admin.role === 'admin') {
          navigate('/admin');
        } else {
          console.warn('Unknown role:', data.user.role);
        }
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;