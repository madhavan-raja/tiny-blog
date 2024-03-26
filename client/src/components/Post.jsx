import { useEffect, useState } from "react";
import server_url from "../server_url";

function Post({ postInfo }) {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    fetch(`${server_url}/users/${postInfo.author}`)
      .then((res) => res.json())
      .then((data) => setAuthor(data));
  });

  return (
    <div className="p-4 rounded-md bg-gray-100">
      <a
        href={`/posts/${postInfo._id}`}
        className="underline-offset-2 hover:underline"
      >
        <h1 className="text-xl mt-2">{postInfo.title}</h1>
      </a>
      <span className="text-sm">
        By{" "}
        <a
          href={`/users/${author._id}`}
          className="underline-offset-2 hover:underline"
        >
          {author.username}
        </a>
      </span>
      <p className="mt-2 text-lg">{postInfo.content}</p>
    </div>
  );
}

export default Post;
