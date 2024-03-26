import { useEffect, useState } from "react";
import Header from "../components/Header";
import PostCard from "../components/Post";

import server_url from "../server_url";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState([]);

  const { postId } = useParams();

  useEffect(() => {
    fetch(`${server_url}/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
          <PostCard key={post._id} postInfo={post} />
        </div>
      </main>
    </>
  );
}
