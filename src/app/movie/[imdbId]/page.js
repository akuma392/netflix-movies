"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieDetailPage = ({ params }) => {
  const { imdbId } = params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const API_KEY_OMDB = "YOUR_OMDB_API_KEY";
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY_OMDB}`
      );
      setMovie(response.data);
    };
    fetchMovie();
  }, [imdbId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <div className="mt-4">
        <strong>Released:</strong> {movie.Released}
      </div>
      <div className="mt-2">
        <strong>IMDb Rating:</strong> {movie.imdbRating}
      </div>
      <div className="mt-2">
        <strong>Genre:</strong> {movie.Genre}
      </div>
    </div>
  );
};

export default MovieDetailPage;
