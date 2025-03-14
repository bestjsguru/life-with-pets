import Login from "./components/Login";
import DogList from "./components/DogList";
import MatchModal from "./components/MatchModal";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import useDogs from "./hooks/useDogs";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { user, setUser, loggedIn, handleLogin, handleLogout } = useAuth();
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
    processing,
    page,
    setPage,
    totalPages,
  } = useDogs(loggedIn);

  return (
    <div
      className="min-h-screen bg-gray-100 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: loggedIn
          ? "none"
          : `url('${process.env.PUBLIC_URL}/images/bgdogs.jpg')`,
      }}
    >
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />

      {!loggedIn ? (
        <Login user={user} setUser={setUser} handleLogin={handleLogin} />
      ) : (
        <div className="p-4">
          <div className="mb-3 gap-2 flex flex-col md:flex-row items-center">
            <Filters
              breeds={breeds}
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            {favorites.length > 0 && (
              <button
                className="p-2 bg-blue-600 rounded text-white min-w-[200px]"
                onClick={generateMatch}
                disabled={processing}
              >
                {processing ? "Generating now..." : "Find Your Match"}
              </button>
            )}
          </div>
          <div
            className={`${
              favorites.length > 0
                ? "max-h-[calc(100vh-268px)]"
                : "max-h-[calc(100vh-220px)]"
            } lg:max-h-[calc(100vh-220px)] overflow-auto`}
          >
            <DogList
              loading={loading}
              dogs={dogs}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      )}
      {matchDog && <MatchModal matchDog={matchDog} setMatchDog={setMatchDog} />}
    </div>
  );
}
