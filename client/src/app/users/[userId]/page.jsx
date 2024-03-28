"use client";

import { useEffect, useState } from "react";
import PostCard from "../../components/PostShort";

export default function User({ params }) {
  const [user, setUser] = useState(null);

  const userId = params.userId;

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <main className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {user &&
            <h2 className="text-3xl font-bold mb-4">User: {user.username}</h2>
          }

          {user && user.posts.map((post) => (
            <PostCard key={post._id} postInfo={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
