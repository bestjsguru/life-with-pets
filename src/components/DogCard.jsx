import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DogCard({
  loading = true,
  dog,
  isFavorite,
  toggleFavorite,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image"; // Placeholder when the image fails

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="w-full h-[200px] bg-gray-300 rounded relative overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-[200px]" />
        ) : (
          <img
            src={errorLoading ? fallbackImage : dog.img}
            alt={dog.name}
            loading="lazy"
            className={`w-full h-[200px] object-cover rounded transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setErrorLoading(true)}
          />
        )}
      </div>

      <h3 className="text-xl font-semibold mt-2">
        {loading ? <Skeleton className="mt-2" /> : dog.name}
      </h3>
      <p>{loading ? <Skeleton /> : `Breed: ${dog.breed}`}</p>
      <p>{loading ? <Skeleton /> : `Age: ${dog.age}`}</p>
      <p>{loading ? <Skeleton /> : `Location: ${dog.zip_code}`}</p>

      <div>
        {loading ? (
          <Skeleton className="h-[40px]" />
        ) : (
          <button
            className={`mt-2 p-2 w-full ${
              isFavorite ? "bg-red-500" : "bg-green-500"
            } text-white rounded transition duration-300`}
            onClick={() => toggleFavorite(dog.id)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        )}
      </div>
    </div>
  );
}
