export default function Filters({
  breeds,
  selectedBreed,
  setSelectedBreed,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="flex space-x-2">
      <select
        className="max-w-[200px] md:max-w-none p-2 border rounded"
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>
      <button
        className="p-2 bg-gray-500 text-white rounded"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Sort: {sortOrder === "asc" ? "ASC" : "DES"}
      </button>
    </div>
  );
}
