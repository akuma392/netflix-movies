"use client";
// import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const MoviesPage = () => {
  // const searchParams = useSearchParams();
  // const query = searchParams.get("query");
  // const genre = searchParams.get("genre");
  // const country = searchParams.get("country");

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY_UNOGS = process.env.NEXT_PUBLIC_UNOGS_API_KEY;
      const response = await axios.get(
        `https://api.apilayer.com/unogs/search/titles`,
        {
          headers: { apikey: API_KEY_UNOGS },
          // params: { title: query, genre, country, page },
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    };
    fetchMovies();
  }, []);

  const goToNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Movie Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdb_id}
            className="bg-white p-4 shadow-md rounded-lg"
          >
            <Link href={`/movie/${movie.imdb_id}`}>
              <a>
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={goToPreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;
