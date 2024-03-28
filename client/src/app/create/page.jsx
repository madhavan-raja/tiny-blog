"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const cookies = useCookies();
  const router = useRouter()

  const token = cookies.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let res = await fetch("/api/posts/", {
        method: 'POST',
        body: JSON.stringify({
          title,
          tags: ([] + tags.split(' ').map(tag => tag.trim())),
          content
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

      router.push(`/posts/${res._id}`)
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
      <div className="container mx-auto p-20">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              id="content"
              placeholder="Enter post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
              Tags (space-separated)
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="tags"
              placeholder="Enter tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;