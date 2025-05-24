interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const goPrev = () => onPageChange(Math.max(page - 1, 1));
  const goNext = () => onPageChange(Math.min(page + 1, totalPages));

  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={goPrev}
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="mt-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={goNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
