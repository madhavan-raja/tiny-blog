"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input id="uername" onChange={(e) => {
              setUsername(e.target.value);
            }} className="border border-1 border-black rounded-md" />
          <label>Password:</label>
          <input id="password" type="password" onChange={(e) => {
              setPassword(e.target.value);
            }} className="border border-1 border-black rounded-md" />
          <button type="submit" className="border border-1 bg-gray-200">Login</button>
        </form>
      </div>
    </main>
  );
}
