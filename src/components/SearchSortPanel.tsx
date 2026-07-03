type SortKey = 'id' | 'name' | 'email' | 'department';

type SearchSortPanelProps = {
  search: string;
  sortKey: SortKey;
  sortOrder: 'asc' | 'desc';
  pageSize: number;
  filterOpen: boolean;
  onSearchChange: (value: string) => void;
  onSortChange: (key: SortKey) => void;
  onPageSizeChange: (size: number) => void;
  onToggleFilter: () => void;
};

const PAGE_OPTIONS = [10, 25, 50, 100];

const SearchSortPanel = ({
  search,
  sortKey,
  sortOrder,
  pageSize,
  filterOpen,
  onSearchChange,
  onSortChange,
  onPageSizeChange,
  onToggleFilter
}: SearchSortPanelProps) => (
  <section className="overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white/95 p-6 shadow-soft shadow-purple-200/20">
    <h2 className="mb-4 text-lg font-semibold text-purple-950">Search & Sort</h2>
    <div className="space-y-5">
      <label className="block text-sm font-medium text-purple-700">
        Search by name, email, or department
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          placeholder="Search users"
        />
      </label>

      <div>
        <p className="mb-3 text-sm font-medium text-purple-700">Sort by</p>
        <div className="flex flex-wrap gap-2">
          {(['id', 'name', 'email', 'department'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => onSortChange(key)}
              className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                sortKey === key
                  ? 'bg-purple-900 text-white shadow-lg shadow-purple-300/20'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} {sortKey === key ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-purple-700">Records per page</p>
        <div className="flex flex-wrap gap-2">
          {PAGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onPageSizeChange(option)}
              className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                pageSize === option
                  ? 'bg-purple-900 text-white shadow-lg shadow-purple-300/20'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleFilter}
        className="mt-1 w-full rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-purple-900 shadow-sm transition hover:bg-purple-100"
      >
        {filterOpen ? 'Hide filters' : 'Show filters'}
      </button>
    </div>
  </section>
);

export default SearchSortPanel;
