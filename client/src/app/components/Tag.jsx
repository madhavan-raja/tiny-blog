function Tag({ tagInfo }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="p-4 rounded-md bg-gray-100">
        <a
          href={`/tags/${tagInfo._id}`}
          className="underline-offset-2 hover:underline"
        >
          <h1 className="text-xl">{tagInfo.name}</h1>
        </a>
      </div>
      <div className="flex flex-col space-y-2 bg-gray-200">
        {tagInfo.posts && tagInfo.posts.map((post) => (
          <a href={`/posts/${post._id}`} key={post._id} className="p-4 rounded-md underline-offset-2 hover:underline">{post.title}</a>
        ))}
      </div>
    </div>
  );
}

export default Tag;
