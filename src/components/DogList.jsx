import DogCard from "./DogCard";

export default function DogList({ loading, dogs, favorites, toggleFavorite }) {
  return (
    <div>
      {dogs.length === 0 && (
        <p className="text-center font-bold min-h-[892px] flex justify-center items-center">
          {!loading ? `There isn't any dogs...` : `Loading...`}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {dogs.map((dog) => (
          <DogCard
            loading={loading}
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
