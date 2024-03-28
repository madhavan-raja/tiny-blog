"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

const Post = ({ postInfo }) => {
  const { title, author, tags, content, comments } = postInfo;
  const numberOfComments = comments.length;

  const [newComment, setNewComment] = useState("");

  const cookies = useCookies();
  const router = useRouter();

  const token = cookies.get('token');

  const handleDeletePost = async (e) => {
    e.preventDefault();
    
    try {
      let res = await fetch(`/api/posts/${postInfo._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (res.status == 401) {
        return router.push("/login")
      }

      if (res.status == 403) {
        alert("You are not authorized to delete this post");
      }
      else {
        router.push(`/`)
      }
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      let res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (res.status == 401) {
        return router.push("/login")
      }

      if (res.status == 403) {
        alert("You are not authorized to delete this comment");
      }
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();
    
    try {

      let res = await fetch(`/api/comments/${postInfo._id}`, {
        method: 'POST',
        body: JSON.stringify({
          "content": newComment
        }),
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (res.status == 401) {
        return router.push("/login")
      }

      router.refresh();
    }
    catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Post Title */}
        <h2 className="text-3xl font-bold">
          <h1>{title}</h1>
        </h2>

        {/* Post Meta */}
        <div>
          <a href={`/authors/${author._id}`} className="text-sm text-gray-600 hover:underline">By {author.username}</a>
        </div>

        {/* Tags */}
        <div className="mb-4">
          {tags.map((tag, index) => (
            <a key={index} href={`/tags/${tag._id}`} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 hover:underline">
              {tag.name}
            </a>
          ))}
        </div>

        {/* Post Body */}
        <p className="text-gray-700 text-base mb-4">{content}</p>

        {/* Number of Comments */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Comments ({numberOfComments})</h3>
          <div className="divide-y divide-gray-300">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-600 font-semibold">{comment.author.username}:</p>
                  <p className="ml-4 text-gray-700">{comment.content}</p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Delete Post Button */}
        <div className="mt-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeletePost}
          >
            Delete Post
          </button>
        </div>

        {/* Create Comment */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Create Comment</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Enter your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreateComment}
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;