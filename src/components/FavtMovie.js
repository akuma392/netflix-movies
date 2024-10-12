"use client"; // Mark this as a Client Component
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const FavtMovie = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const moviesPerPage = 8; // Display 8 movies per page

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://imdb188.p.rapidapi.com/api/v1/getWeekTop10";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d9165dc9c9msh07e011ce1852f0fp15391bjsn4e1fdf753492",
          "x-rapidapi-host": "imdb188.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.data); // Store the fetched movie data
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Calculate the movies to display on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = Array.isArray(movies)
    ? movies.slice(indexOfFirstMovie, indexOfLastMovie)
    : [];

  const totalPages = Math.ceil(movies.length / moviesPerPage); // Calculate total pages

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Top Movies This Week</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg text-white">
            <img
              src={movie.primaryImage.imageUrl}
              alt={movie.titleText.text}
              className="w-full h-auto rounded-lg mb-4"
            />
            {/* Movie Title */}
            <h2 className="text-xl font-semibold mb-2">
              {movie.titleText.text}
            </h2>
            {/* Plot Summary */}
            <p className="text-sm text-gray-300 mb-2">
              {movie.plot?.plotText?.plainText || "No plot available."}
            </p>
            {/* Movie Rating and Year */}
            <div className="flex justify-between items-center mt-4">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm">
                ⭐ {movie.ratingsSummary.aggregateRating || "N/A"}
              </span>
              <span className="text-sm">{movie.releaseYear.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FavtMovie;
