function User({ userInfo }) {
  console.log(userInfo)
  return (
    <div className="flex flex-col space-y-2">
      <div className="p-4 rounded-md bg-gray-100">
        <a
          href={`/users/${userInfo._id}`}
          className="underline-offset-2 hover:underline"
        >
          <h1 className="text-xl">{userInfo.username}</h1>
        </a>
      </div>
      <div className="flex flex-col space-y-2 bg-gray-200">
        {userInfo.posts && userInfo.posts.map((post) => (
          <a href={`/posts/${post._id}`} key={post._id} className="p-4 rounded-md underline-offset-2 hover:underline">{post.title}</a>
        ))}
      </div>
    </div>
  );
}

export default User;
