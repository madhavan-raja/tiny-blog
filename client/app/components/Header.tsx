import Link from "next/link"

const user = null;

function Header() {
  return (
    <header className="w-full fixed bg-gray-100">
      <div className="py-2 max-w-4xl mx-auto flex flex-row justify-between">
        <a href="/" className="px-2 py-3 bg-black text-white flex items-center">
          MjesticBlog
        </a>
        <div className="px-2 py-3 flex items-center space-x-4">
          {user ?
            <>
              <Link href="create">Create Post</Link>
              <Link href="logout">Logout</Link>
            </>
          :
            <>
              <Link href="login">Login</Link>
            </>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;