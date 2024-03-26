function Post({postInfo}) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 rounded-md bg-gray-100 flex flex-col space-y-2">
        <a
          href={`/posts/${postInfo._id}`}
          className="underline-offset-2 hover:underline"
        >
          <h1 className="text-xl">{postInfo.title}</h1>
        </a>
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
          {postInfo.tags.map((tag) => <span key={tag} className="text-sm bg-gray-200 rounded-md p-1">{tag.name}</span>)}
        </div>
        <p className="text-lg">{postInfo.content}</p>
      </div>
      { postInfo.comments.length > 0 && <div className="w-full p-2 flex flex-col space-y-2 rounded-md bg-gray-200">
        {postInfo.comments.map((comment) => (
          <span key={comment._id}><a href={`/users/${comment.author._id}`} className="font-bold">{comment.author.username}</a>: {comment.content}</span>
        ))}
      </div>}
    </div>
  );
}

export default Post;
