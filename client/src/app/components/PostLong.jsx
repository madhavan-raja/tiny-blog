"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

function Post({postInfo}) {
  const [commentContent, setCommentContent] = useState("");

  const cookies = useCookies();
  const router = useRouter();

  const token = cookies.get('token');

  const handleDelete = async (e) => {
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

  const handleComment = async (e) => {
    e.preventDefault();
    
    try {

      let res = await fetch(`/api/comments/${postInfo._id}`, {
        method: 'POST',
        body: JSON.stringify({
          "content": commentContent
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

  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 rounded-md bg-gray-100 flex flex-col space-y-2">
        <div className="flex justify-between">
          <a
            href={`/posts/${postInfo._id}`}
            className="underline-offset-2 hover:underline"
          >
            <h1 className="text-xl">{postInfo.title}</h1>
          </a>
          <button onClick={handleDelete} className="bg-red-500 text-white rounded-md p-1">Delete</button>
        </div>
        <span className="text-sm">
          By{" "}
          <a
            href={`/users/${postInfo.author._id}`}
            className="underline-offset-2 hover:underline"
          >
            {postInfo.author.username}
          </a>
        </span>
        <div className="flex flex-row space-x-2">
          {postInfo.tags.map((tag) =>
            <a key={tag._id} href={`/tags/${tag._id}`}>
              <span className="text-sm bg-gray-200 rounded-md p-1">{tag.name}</span>
            </a>
          )}
        </div>
        <p className="text-lg">{postInfo.content}</p>
      </div>
      { postInfo.comments.length > 0 && <div className="w-full p-2 flex flex-col space-y-2 rounded-md bg-gray-200">
        {postInfo.comments.map((comment) => (
          <div key={comment._id} className="flex justify-between">
            <span><a href={`/users/${comment.author._id}`} className="font-bold">{comment.author.username}</a>: {comment.content}</span>
            <button onClick={() => {
              handleDeleteComment(comment._id);
            }} className="bg-red-500 text-white rounded-md p-1">Delete</button>
          </div>
        ))}
      </div>}
      <div className="w-full p-2 flex flex-col space-y-2 rounded-md bg-gray-200">
        <form onClick={handleComment}>
          <input id="comment" name="comment" onChange={(e) => {
              setCommentContent(e.target.value);
            }} type="text" className="w-full border border-1 border-black rounded-md" />
          <button className="border border-1 bg-blue-500 text-white rounded-md p-1">Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
