export default function Pagination({ page, totalPages, setPage }) {
  const maxPagesToShow = 10;
  let startPage = Math.max(0, page - 5);
  let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(0, endPage - maxPagesToShow + 1);
  }

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        className="p-2 bg-gray-500 text-white rounded"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      {startPage > 0 && (
        <span className="p-2 bg-gray-300 text-white rounded">...</span>
      )}

      {pages.map((p, index) => (
        <button
          key={index}
          className={`p-2 ${
            page === p ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
          onClick={() => typeof p === "number" && setPage(p)}
        >
          {p + 1}
        </button>
      ))}
      {endPage < totalPages - 1 && (
        <span className="p-2 bg-gray-300 text-white rounded">...</span>
      )}

      <button
        className="p-2 bg-gray-500 text-white rounded"
        disabled={page === totalPages - 1}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
