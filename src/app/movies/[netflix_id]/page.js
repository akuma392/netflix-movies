"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Pagination from "../../../components/Pagination"; // Use the common Pagination component

const MoviesPage = ({ params }) => {
  const { netflix_id } = params; // Get the genre ID from the URL
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // For client-side pagination
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20; // Number of movies to display per page

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY_UNOGS = process.env.NEXT_PUBLIC_UNOGS_API_KEY; // Replace with your API key
      try {
        const response = await axios.get(
          `https://api.apilayer.com/unogs/search/titles?genre_list=${netflix_id}`,
          {
            headers: {
              apikey: API_KEY_UNOGS,
            },
          }
        );
        setMovies(response.data.results); // Store all movies
        setFilteredMovies(response.data.results); // Initialize filtered movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [netflix_id]);

  // Calculate the movies to display on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage); // Total number of pages based on filtered movies

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
      <h1 className="text-3xl font-bold mb-4">Movies in Genre {netflix_id}</h1>
      <p className="text-sm mb-4 text-gray-500">
        Total Results: {filteredMovies.length}
      </p>

      {/* Display Movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie.netflix_id}
            className="bg-gray-800 p-4 rounded-lg text-white"
          >
            <h2 className="text-base font-semibold">{movie.title}</h2>
            <img
              src={movie.img}
              alt={movie.title}
              className="w-full h-48 lg:h-56 object-cover mb-2"
            />
            <p className="text-xs text-indigo-200">Rating: {movie.rating}</p>
            <p className="text-xs text-indigo-200">Year: {movie.year}</p>
            {/* Spacer to push content to top and See More to bottom */}
            <div className="flex-grow"></div>

            {/* See More Button */}
            <Link href={`/movie/${movie.imdb_id}`}>
              <div className="mt-4 bg-blue-600 text-white text-center py-2 rounded-lg">
                See More
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Reusable Pagination Component */}
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

export default MoviesPage;
