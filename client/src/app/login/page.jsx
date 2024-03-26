"use client";

export default function Login() {
  return (
    <>
      <main>
        <div className="py-20 max-w-4xl mx-auto flex flex-col space-y-4">
          <form>
            <label>Username:</label>
            <input id="uername" className="border border-1 border-black rounded-md" />
            <label>Password:</label>
            <input id="password" type="password" className="border border-1 border-black rounded-md" />
            <button type="submit" className="border border-1 bg-gray-200">Login</button>
          </form>
        </div>
      </main>
    </>
  );
}
