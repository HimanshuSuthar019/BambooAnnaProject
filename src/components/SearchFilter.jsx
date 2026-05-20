import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export function SearchFilter({ onSearch, onFilter }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function handleSearch(value) {
    setQuery(value);
    onSearch(value);
  }

  function handleSort(value) {
    setSortBy(value);
    onFilter(value);
  }

  function clearSearch() {
    setQuery("");
    onSearch("");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search bamboo products..."
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-white text-sm font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-all w-full sm:w-auto justify-center"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          Sort
          {sortBy !== "default" && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>

        {isFilterOpen && (
          <>
            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsFilterOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-border shadow-xl z-20 overflow-hidden">
              {[
                { label: "Default", value: "default" },
                { label: "Price: Low to High", value: "price-asc" },
                { label: "Price: High to Low", value: "price-desc" },
                { label: "Name: A to Z", value: "name-asc" },
                { label: "Name: Z to A", value: "name-desc" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleSort(option.value);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                    sortBy === option.value
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}