"use client";

import { useState } from "react";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [isSubmitted, setSubmitted] = useState(false);
//   const [isSentSuccessfully, setSentSuccessfully] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: 'POST',
//         body: JSON.stringify({
//           username, password
//         }),
//         headers: {
//           'content-type': 'application/json'
//         }
//       })

//       setSubmitted(true)
//       setSentSuccessfully(res.status == 201)
//     }
//     catch (err) {
//       console.log("Error:", err)
//     }
//   }

//   return (
//     <main>
//       <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
//         <form onSubmit={isSentSuccessfully ? () => {} : handleSubmit}>
//           <label>Username:</label>
//           <input name="username" id="uername" onChange={(e) => {
//               setUsername(e.target.value);
//             }} className="border border-1 border-black rounded-md" />
//           <label>Password:</label>
//           <input name="password" id="password" type="password" onChange={(e) => {
//               setPassword(e.target.value);
//             }} className="border border-1 border-black rounded-md" />
//           <button type="submit" className="border border-1 bg-gray-200">Register</button>
//         </form>
//         {isSubmitted ? (
//           isSentSuccessfully ? (
//             <p className="text-green-500">Registration successful!</p>
//           ) : (
//             <p className="text-red-500">Registration failed!</p>
//           )
//         ) : ""}
//       </div>
//     </main>
//   );
// }

const RegisterPage = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (username && password && confirmPassword) {
        if (password === confirmPassword) {
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
        } else {
          alert('Passwords do not match.');
        }
      }
      else {
        alert('Please enter all fields.');
      }
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <div className="container mx-auto p-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-4">Register</h2>

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
        <div className="mb-4">
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;