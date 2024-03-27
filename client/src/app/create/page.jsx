"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [isSentSuccessfully, setSentSuccessfully] = useState(false);

  const cookies = useCookies();

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = cookies.get('token');
      let res = await fetch("/api/posts/", {
        method: 'POST',
        body: JSON.stringify({
          title, tags, content
        }),
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      res = await res.json();

      if (res.status == 401) {
        return router.push("/login")
      }

      setSentSuccessfully(res.status == 200)

      console.log(res);
      router.push(`/posts/${res._id}`)
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        <form onSubmit={isSentSuccessfully ? () => {} : handleSubmit}>
          <label>Title:</label>
          <input id="title" onChange={(e) => {
              setTitle(e.target.value);
            }} className="border border-1 border-black rounded-md" />

          <label>Tags:</label>
          <input id="tags" onChange={(e) => {
              setTags(e.target.value.split(" "));
            }} className="border border-1 border-black rounded-md" />

          <label>Content:</label>
          <input id="content" onChange={(e) => {
              setContent(e.target.value);
            }} className="border border-1 border-black rounded-md" />

          <button type="submit" className="border border-1 bg-gray-200">Create Post</button>
        </form>
      </div>
    </main>
  );
}
