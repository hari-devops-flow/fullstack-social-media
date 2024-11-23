import React, { useState } from 'react';
import axios from '../api';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', form);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
