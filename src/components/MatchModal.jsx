import { useState } from 'react'

export default function MatchModal({ matchDog, setMatchDog }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);
  const fallbackImage = "https://via.placeholder.com/150?text=No+Image"; // Placeholder when the image fails

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-[100%]">
        <h2 className="text-2xl font-bold mb-2">Your Match!</h2>
        <img
            src={errorLoading ? fallbackImage : matchDog.img}
            alt={matchDog.name}
            loading="lazy"
            className={`w-full min-w-[300px] lg:min-w-[500px] max-w-[100%] h-[250px] object-cover rounded transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setErrorLoading(true)}
          />
        <h3 className="text-xl font-semibold mt-2">{matchDog.name}</h3>
        <p>{`Breed: ${matchDog.breed}`}</p>
        <p>{`Age: ${matchDog.age}`}</p>
        <p>{`Location: ${matchDog.zip_code}`}</p>
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
