"use client"; // Mark this as a Client Component
import Link from "next/link"; // Import Link
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import Loader from "@/components/Loader";

const GenrePage = () => {
  const [genres, setGenres] = useState([]); // All genres from API
  const [filteredGenres, setFilteredGenres] = useState([]); // Genres shown after filtering or on initial load
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [loading, setLoading] = useState(true);
  const genresPerPage = 20; // Number of genres to display per page

  useEffect(() => {
    const fetchGenres = async () => {
      const API_KEY_UNOGS = process.env.NEXT_PUBLIC_UNOGS_API_KEY; // Replace with your API key
      console.log(
        API_KEY_UNOGS,
        ">>>>>>>",
        process.env.NEXT_PUBLIC_UNOGS_API_KEY,
        process.env
      );
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.apilayer.com/unogs/static/genres`,
          {
            headers: {
              apikey: API_KEY_UNOGS,
            },
          }
        );
        console.log(response, ">>>>>>");

        // Ensure that the response is an array
        if (Array.isArray(response.data.results)) {
          setGenres(response.data.results); // Store all genres
          setFilteredGenres(response.data.results); // Initialize filtered genres with all genres (to show on load)
          setLoading(false);
        } else {
          console.error("Error: API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Handle search input change and filter genres
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // If search term is empty, reset to show all genres
    if (searchValue === "") {
      setFilteredGenres(genres);
    } else {
      // Filter genres based on the search term
      const filtered = genres.filter((genre) =>
        genre.genre.toLowerCase().includes(searchValue)
      );
      setFilteredGenres(filtered);
      setCurrentPage(1); // Reset to the first page when filtering
    }
  };

  // Calculate the genres to display on the current page
  const indexOfLastGenre = currentPage * genresPerPage;
  const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
  const currentGenres = filteredGenres.slice(
    indexOfFirstGenre,
    indexOfLastGenre
  );

  const totalPages = Math.ceil(filteredGenres.length / genresPerPage); // Total number of pages based on filtered genres

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

  // Dynamic pagination numbers based on current page
  const generatePageNumbers = () => {
    const pageNumbers = [];

    if (currentPage > 2) {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push("...");
      }
    }

    if (currentPage > 1) {
      pageNumbers.push(currentPage - 1);
    }

    pageNumbers.push(currentPage);

    if (currentPage < totalPages) {
      pageNumbers.push(currentPage + 1);
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Available Netflix Genres</h1>
      <p className="text-sm mb-4 text-gray-500">
        Total Results: {filteredGenres.length}
      </p>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a genre..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Display Genres */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentGenres.map((genre) => (
              <Link key={genre.genreid} href={`/movies/${genre.netflix_id}`}>
                <div
                  key={genre.genreid}
                  className="bg-gray-800 p-4 rounded-lg text-white"
                >
                  <h2 className="text-base font-semibold">{genre.genre}</h2>
                  <p className="text-xs text-indigo-200">
                    ID: {genre.netflix_id}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default GenrePage;
