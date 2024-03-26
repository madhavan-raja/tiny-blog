import { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";

import server_url from "../server_url";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${server_url}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
          {posts.map((post) => (
            <Post key={post._id} postInfo={post} />
          ))}
        </div>
      </main>
    </>
  );
}
