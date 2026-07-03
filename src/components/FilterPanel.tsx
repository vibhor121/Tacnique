type FilterKey = 'firstName' | 'lastName' | 'email' | 'department';

type FilterPanelProps = {
  filter: Record<FilterKey, string>;
  onFilterChange: (key: FilterKey, value: string) => void;
};

const displayLabels: Record<FilterKey, string> = {
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  department: 'Department'
};

const FilterPanel = ({ filter, onFilterChange }: FilterPanelProps) => (
  <section className="overflow-hidden rounded-[1.75rem] border border-purple-100 bg-white/95 p-6 shadow-soft shadow-purple-200/20">
    <h2 className="mb-4 text-lg font-semibold text-purple-950">Filter users</h2>
    <div className="space-y-4">
      {Object.entries(filter).map(([key, value]) => (
        <label key={key} className="block text-sm font-medium text-purple-700">
          {displayLabels[key as keyof typeof displayLabels]}
          <input
            value={value}
            onChange={(event) => onFilterChange(key as keyof typeof filter, event.target.value)}
            className="mt-3 w-full rounded-3xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-950 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            placeholder={`Filter by ${displayLabels[key as keyof typeof displayLabels]}`}
          />
        </label>
      ))}
    </div>
  </section>
);

export default FilterPanel;
