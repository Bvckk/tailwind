export default function Pagination({currentPage, totalPage, onPageChange}) {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
               onClick={() => onPageChange - 1}
               disable={currentPage === 1}
               className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prew
            </button>
            <span className="px-2 py-1">
                {currentPage / totalPage}
            </span>
            <button
                onClick={() => onPageChange + 1}
                disable={currentPage === totalPage}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}