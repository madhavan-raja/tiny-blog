"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {users.map((user) => (
          <span key={user._id}>{user.username}</span>
        ))}
      </div>
    </main>
  );
}
