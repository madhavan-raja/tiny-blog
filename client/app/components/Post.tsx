import Image from 'next/image';
import PostInfo from '../models/PostInfo';

function Post(postInfo: PostInfo) {
  return (
    <div className="p-4 rounded-md bg-gray-100">
      <div className="flex items-center space-x-2">
        {/* <Image width={20} height={20} src="https://via.placeholder.com/20" className="rounded-full" alt="avatar" /> */}
        <img src="https://via.placeholder.com/20" className="rounded-full" alt="avatar" />
        <span className="text-sm">
          {postInfo.author}
        </span>
      </div>
      <h1 className="text-xl mt-2">{postInfo.title}</h1>
      <p className="text-lg">{postInfo.content}</p>
    </div>
  );
}

export default Post;