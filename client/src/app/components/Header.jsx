const user = null;

function Header() {
  return (
    <header className="w-full fixed bg-gray-100">
      <div className="py-2 max-w-4xl mx-auto flex flex-row justify-between">
        <a href="/" className="px-2 py-3 bg-black text-white flex items-center">
          TinyBlog
        </a>
        <div className="px-2 py-3 flex items-center space-x-4">
          {user ? (
            <>
              <a href="create">Create Post</a>
              <a href="logout">Logout</a>
            </>
          ) : (
            <>
              <a href="register">Register</a>
              <a href="login">Login</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
