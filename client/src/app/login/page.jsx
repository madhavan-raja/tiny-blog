"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const cookies = useCookies();
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let res = await fetch("/api/auth/login", {
        method: 'POST',
        body: JSON.stringify({
          username, password
        }),
        headers: {
          'content-type': 'application/json'
        }
      })

      res = await res.json();

      cookies.set('token', res.token);

      router.push("/")
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <div className="container mx-auto p-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-4">Login</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;