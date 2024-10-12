"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation for client-side navigation
import axios from "axios";
import FavtMovie from "@/components/FavtMovie";

const HomePage = () => {
  const [query, setQuery] = useState("");

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchFilters = async () => {
      const API_KEY_UNOGS = process.env.NEXT_PUBLIC_UNOGS_API_KEY;
      const genreResponse = await axios.get(
        `https://api.apilayer.com/unogs/static/genres`,
        {
          headers: { apikey: API_KEY_UNOGS },
        }
      );
      const countryResponse = await axios.get(
        `https://api.apilayer.com/unogs/static/countries`,
        {
          headers: { apikey: API_KEY_UNOGS },
        }
      );
      // console.log(genreResponse, countryResponse, ">>>>>>>>>>>");
      // setGenres(genreResponse.data.results);
      // setCountries(countryResponse.data.results);
    };
    fetchFilters();
  }, []);

  const searchMovies = () => {
    router.push(
      `/movies?query=${query}&genre=${selectedGenre}&country=${selectedCountry}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Netflix Movie Search
      </h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 w-full max-w-md p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <FavtMovie />
    </div>
  );
};

export default HomePage;
