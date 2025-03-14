import Login from "./components/Login";
import DogList from "./components/DogList";
import MatchModal from "./components/MatchModal";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import useDogs from "./hooks/useDogs";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { user, setUser, loggedIn, handleLogin } = useAuth();
  const {
    dogs,
    breeds,
    selectedBreed,
    setSelectedBreed,
    sortOrder,
    setSortOrder,
    favorites,
    toggleFavorite,
    generateMatch,
    matchDog,
    setMatchDog,
    loading,
    page,
    setPage,
    totalPages,
  } = useDogs(loggedIn);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {!loggedIn ? (
        <Login user={user} setUser={setUser} handleLogin={handleLogin} />
      ) : (
        <div>
          <div className="mb-4 flex items-center">
            <Filters
              breeds={breeds}
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            {favorites.length > 0 && (
              <button
                className="ml-4 p-2 bg-blue-600 text-white"
                onClick={generateMatch}
              >
                Find Your Match
              </button>
            )}
          </div>
          <>
            <DogList
              loading={loading}
              dogs={dogs}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        </div>
      )}
      {matchDog && <MatchModal matchDog={matchDog} setMatchDog={setMatchDog} />}
    </div>
  );
}
