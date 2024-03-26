"use client";

import { useEffect, useState } from "react";
import UserCard from "../../components/User";

export default function User({ params }) {
  const [user, setUser] = useState([]);

  const userId = params.userId;

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {user ? <UserCard key={user._id} userInfo={user} /> : ""}
      </div>
    </main>
  );
}
