'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { signIn } from "next-auth/react";
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (type === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      alert("Registered! Now log in.");
      return;
    }

    // Login
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      login({ name: formData.name || "User", email: formData.email });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-sm w-full mx-auto px-4 py-10 text-neutral-900"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">Welcome to Shoporia</h2>
        <p className="text-sm text-neutral-500">
          {type === 'login' ? 'Sign in to continue' : 'Create your account'}
        </p>
      </div>

      {type === 'register' && (
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:ring-black focus:outline-none transition"
          />
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:ring-black focus:outline-none transition"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-neutral-700">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:ring-black focus:outline-none transition"
        />
      </div>

      {type === 'register' && (
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white focus:ring-black focus:outline-none transition"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors duration-200"
      >
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
