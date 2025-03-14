export default function MatchModal({ matchDog, setMatchDog }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-2">Your Match!</h2>
        <img
          src={matchDog.img}
          alt={matchDog.name}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="text-xl font-semibold mt-2">{matchDog.name}</h3>
        <button
          className="mt-4 p-2 bg-red-500 text-white w-full"
          onClick={() => setMatchDog(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
