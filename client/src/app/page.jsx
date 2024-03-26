"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/PostShort";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post._id} postInfo={post} />
        ))}
      </div>
    </main>
  );
}
