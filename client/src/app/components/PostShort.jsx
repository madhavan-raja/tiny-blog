const Post = ({ postInfo }) => {
  const { _id, title, author, tags, content, comments } = postInfo;
  const numberOfComments = comments.length;


  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold">
          <a href={`/posts/${_id}`} className="text-blue-500 hover:underline">{title}</a>
        </h2>

        <div className="text-sm text-gray-600">
          {/* <span className="text-sm text-gray-600">By {author.username}</span> */}
          By{" "} <a href={`/users/${author._id}`} className="hover:underline">{author.username}</a>
        </div>

        <div className="mb-4">
          {tags.map((tag, index) => (
            <a key={index} href={`/tags/${tag._id}`} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 hover:underline">
              {tag.name}
            </a>
          ))}
        </div>

        <p className="text-gray-700 text-base">{content}</p>

        <div className="mt-6">
          <p className="text-gray-600">{numberOfComments} {numberOfComments === 1 ? 'Comment' : 'Comments'}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;