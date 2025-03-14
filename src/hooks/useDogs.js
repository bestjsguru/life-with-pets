import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://frontend-take-home-service.fetch.com";

export default function useDogs(loggedIn) {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [matchDog, setMatchDog] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      fetchBreeds();
      fetchDogs();
    }
  }, [loggedIn, selectedBreed, sortOrder, page]);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get(`${API_BASE}/dogs/breeds`, {
        withCredentials: true,
      });
      setBreeds(response.data);
    } catch (error) {
      console.error("Error fetching breeds", error);
    }
  };

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/dogs/search`, {
        params: {
          breeds: selectedBreed ? [selectedBreed] : undefined,
          size: 8,
          from: page * 8,
          sort: `breed:${sortOrder}`,
        },
        withCredentials: true,
      });

      await fetchDogDetails(response.data.resultIds);
      setTotalPages(Math.ceil(response.data.total / 8));
    } catch (error) {
      console.error("Error fetching dogs", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDogDetails = async (ids) => {
    try {
      const response = await axios.post(`${API_BASE}/dogs`, ids, {
        withCredentials: true,
      });
      setDogs(response.data);
    } catch (error) {
      console.error("Error fetching dog details", error);
    }
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const generateMatch = async () => {
    try {
      const response = await axios.post(`${API_BASE}/dogs/match`, favorites, {
        withCredentials: true,
      });
      const matchId = response.data.match;
      const matchResponse = await axios.post(`${API_BASE}/dogs`, [matchId], {
        withCredentials: true,
      });
      setMatchDog(matchResponse.data[0]);
    } catch (error) {
      console.error("Error generating match", error);
    }
  };

  return {
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
  };
}
