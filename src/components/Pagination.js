import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  setCurrentPage,
}) => {
  // Generate page numbers dynamically based on current page and total pages
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
    <div className="mt-8 flex justify-center items-center space-x-2">
      <button
        className={`px-4 py-2 bg-gray-600 text-white rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Dynamic Page Numbers */}
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => typeof page === "number" && setCurrentPage(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className={`px-4 py-2 bg-gray-600 text-white rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
