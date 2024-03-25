import Post from "./components/Post";
import PostInfo from "./models/PostInfo";

const posts: PostInfo[] = [
  { title: "Hello World", author: "Mjestic", content: "This is a test post." },
  { title: "Second Post", author: "Chamoy", content: "This is another test post." },
]

export default function Home() {
  return (
    <main>
      <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
        {posts.map(post => <Post key={post.title} title={post.title} author={post.author} content={post.content} />)}
      </div>
    </main>
  );
}
