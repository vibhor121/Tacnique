type PaginationBarProps = {
  page: number;
  pageCount: number;
  pageSize: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSizeChange: (value: number) => void;
};

const PaginationBar = ({ page, pageCount, pageSize, onPrevious, onNext, onPageSizeChange }: PaginationBarProps) => (
  <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] bg-purple-50 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex flex-wrap items-center gap-2 text-sm text-purple-700">
      <span>Records per page:</span>
      <select
        value={pageSize}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
        className="rounded-3xl border border-purple-200 bg-white px-3 py-2 text-sm text-purple-800 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
      >
        {[10, 25, 50, 100].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={onPrevious}
        className="rounded-3xl border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={onNext}
        className="rounded-3xl border border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
);

export default PaginationBar;
