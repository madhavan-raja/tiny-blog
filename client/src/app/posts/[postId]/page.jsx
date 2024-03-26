"use client";

import { useEffect, useState } from "react";
import PostCard from "../../components/PostLong";

export default function Post({ params }) {
  const postId = params.postId;

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {post ? <PostCard key={post._id} postInfo={post} /> : ""}
      </div>
    </main>
  );
}
