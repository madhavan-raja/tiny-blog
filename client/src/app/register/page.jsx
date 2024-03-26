"use client";

import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitted, setSubmitted] = useState(false);
  const [isSentSuccessfully, setSentSuccessfully] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("/api/auth/register", {
        method: 'POST',
        body: JSON.stringify({
          username, password
        }),
        headers: {
          'content-type': 'application/json'
        }
      })

      setSubmitted(true)
      setSentSuccessfully(res.status == 201)
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        <form onSubmit={isSentSuccessfully ? () => {} : handleSubmit}>
          <label>Username:</label>
          <input name="username" id="uername" onChange={(e) => {
              setUsername(e.target.value);
            }} className="border border-1 border-black rounded-md" />
          <label>Password:</label>
          <input name="password" id="password" type="password" onChange={(e) => {
              setPassword(e.target.value);
            }} className="border border-1 border-black rounded-md" />
          <button type="submit" className="border border-1 bg-gray-200">Register</button>
        </form>
        {isSubmitted ? (
          isSentSuccessfully ? (
            <p className="text-green-500">Registration successful!</p>
          ) : (
            <p className="text-red-500">Registration failed!</p>
          )
        ) : ""}
      </div>
    </main>
  );
}
