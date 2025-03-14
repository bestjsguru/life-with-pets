export default function Header({ loggedIn, handleLogout }) {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">🐶 Life with Dogs</h1>
      {loggedIn && (
        <button
          className="p-2 bg-red-500 text-white rounded shadow transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </header>
  );
}
